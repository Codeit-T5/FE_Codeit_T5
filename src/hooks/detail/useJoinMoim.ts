// 모임 참여하기 커스텀 훅
import { getDetail, joinApi } from '@/apis/detail/detail.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/auth.hook';
import { IMoimDetail, IMoimMasterResponse } from '@/types/detail/t-moim';
import { QUERY_KEYS } from '@/constants/detail/detail.const';
import { TMe } from '@/types/auth/auth.type';

interface IUseJoinMoimOptions {
  user?: TMe | null;
  onSuccess?: () => void;
  onError?: (error: unknown) =>  void;
}

export const useJoinMoim = (moimId: string, options: IUseJoinMoimOptions = {}) => {
  const { me, isMeLoading } = useAuth();
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options;

  // 모임상세 조회
  const { data: moimDetail, isLoading: isLoadingDetail } = useQuery({
    queryKey: QUERY_KEYS.MOIM_DETAIL(moimId),
    queryFn: () => getDetail(moimId),
    enabled: !!moimId,
  });

  // 현재 유저가 이 모임을 이미 참여했는지 확인
  const isJoined = me && moimDetail?.moim.participatedUsers?.some(user => user.userUuid === me.id);
  // 참여 가능한 모임인지 확인 - 유저 신청 여부, 정원, 모집중(RECRUIT)
  const canJoin = me && moimDetail && !isJoined && moimDetail.moim.participants < moimDetail.moim.maxParticipants && moimDetail.moim.status === 'RECRUIT';
  const isHost = me && moimDetail?.masterUser.id === me.id;  

  const { mutateAsync: joinMutation, isPending: isJoining } = useMutation({
    mutationFn: async () => {
      if (!me) throw new Error('로그인이 필요합니다.');
      if (!canJoin) throw new Error('참여할 수 없는 모임입니다');

      const response = await joinApi.join(moimId);
      return response;
    },

    // 낙관적 업데이트
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.MOIM_DETAIL(moimId) });
      const previousData = queryClient.getQueryData<IMoimMasterResponse>(QUERY_KEYS.MOIM_DETAIL(moimId));
      if (previousData?.moim && me) {
        const newParticipant = {
          userUuid: me.id,
          userEmail: me.email,
          userImage: me.image || '',
          userNickname: me.nickname,
        };

        queryClient.setQueryData<IMoimMasterResponse>(QUERY_KEYS.MOIM_DETAIL(moimId), {
          masterUser: previousData?.masterUser,   // master 정보는 유지
          moim: {
            ...previousData?.moim,
            participants: previousData.moim.participants + 1,
            participatedUsers: [...previousData?.moim.participatedUsers, newParticipant],
          }
        });
      }
      return { previousData };
    },

    // 서버 응답 성공시
    onSuccess: async (response) => {
      // 모임 상세 데이터 캐시 업데이트
      await queryClient.setQueryData<IMoimDetail>(QUERY_KEYS.MOIM_DETAIL(moimId), response.data);

      // 내가 참여한 모임 목록 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: ['getParticipatedMoim']});
      queryClient.invalidateQueries({ queryKey: ['moims']});

      onSuccess?.();
    },
    // 이전 상태로 롤백
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<IMoimMasterResponse>(
          QUERY_KEYS.MOIM_DETAIL(moimId),
          context.previousData
        );
      }
    }
  });

  // 참여 토글 핸들러
  const handleJoinMoim = async () => {
    if (!me) throw new Error('로그인이 필요합니다');
    if (isHost) {
      return { success: false, message: '내가 작성한 모임은 참여할 수 없습니다'};
    }
    if (isJoined) {
      return { success: false, message: '이미 신청한 모임입니다'};
    }
    if (!canJoin) throw new Error('참여할 수 없는 모임입니다');
    try {
      await joinMutation();
      return { 
        success: true, 
        message: '모임 신청이 완료되었습니다'
      };
    } catch (error) {
      throw error;
    }
  };
  return {
    isJoined: !!isJoined,
    canJoin: !!canJoin,
    isHost: !!isHost,
    handleJoinMoim,
    isLoading: isLoadingDetail || isJoining || isMeLoading,
    participantsCount: moimDetail?.moim.participants ?? 0,
    maxParticipants: moimDetail?.moim.maxParticipants ?? 0,
  };
};