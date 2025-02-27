'use client';
import { useAuth } from '@/hooks/auth/auth.hook';
import { useMoimDetail } from '@/hooks/detail/useMoimDetail';
import { useJoinMoim } from '@/hooks/detail/useJoinMoim';
import { useLikeMoim } from '@/hooks/detail/useLikeMoim';
import { useRouter } from 'next/navigation';
import DetailPresenter from '@/components/detail/DetailPresenter';
import { DetailSkeleton } from '@/components/detail/DetailSkeleton';
import { toast } from 'sonner';
import { CheckCircle, XCircle } from 'lucide-react';
import { DEFAULT_IMAGE } from '@/constants/detail/detail.const';

interface IDetailContainerProps {
  moimId: string;
}

export default function DetailContainer({ moimId }: IDetailContainerProps) {
  const { me, isMeLoading } = useAuth(); // 로그인 상태 확인
  const {
    data: detail,
    isLoading: isDetailLoading,
    error,
  } = useMoimDetail(moimId, { enabled: !isMeLoading, user: me });
  const { isLiked, handleToggleLike } = useLikeMoim(moimId, { user: me });
  const { isJoined, canJoin, isHost, handleJoinMoim, isLoading: isJoining } = useJoinMoim(moimId);
  const router = useRouter();

  const detailData = detail?.moim;
  const masterUser = detail?.masterUser;

  // 찜하기 버튼 핸들러
  const handleLike = async () => {
    try {
      await handleToggleLike();
      toast.success(isLiked ? '찜하기가 취소되었어요' : '찜하기가 완료되었어요', {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        action: {
          label: '내역 확인',
          onClick: () => {
            router.push('/mylike');
          },
        },
      });
    } catch (error) {
      toast.error('잠시후 다시 시도해주세요');
    }
  };

  // 신청하기 버튼 핸들러
  const handleJoin = async () => {
    try {
      const result = await handleJoinMoim();
      if (!result.success) {
        toast.info(result.message);
        return;
      }
      toast.success('모임 신청이 완료되었어요', {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        action: {
          label: '내역 확인',
          onClick: () => {
            router.push('/mypage');
          },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('잠시후 다시 시도해주세요', {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
        });
      }
    }
  };
  // moim 데이터가 있을 때 기본 이미지 처리
  const moim = detailData ? {
    ...detailData,
    image: detailData.image || DEFAULT_IMAGE.MOIM
  } : null;

  // 신청하기 버튼 라벨 결정
  const getActionLabel = () => {
    if (isHost) return '내가 작성한 모임입니다';
    if (isJoined) return '신청완료';
    if (!canJoin || moim?.status !== 'RECRUIT') return '모집마감';
    return '신청하기';
  };

  if (isDetailLoading || isMeLoading || !detailData || !masterUser) return <DetailSkeleton />;

  return (
    // <div>
      <DetailPresenter
        data={moim || null}
        masterUser={masterUser || null}
        participants={moim?.participatedUsers || []}
        reviews={moim?.reviews}
        isJoining={isJoining}
        canJoin={canJoin}
        isLiked={isLiked || false}
        onJoin={handleJoin}
        onLikeToggle={handleLike}
        actionLabel={getActionLabel()}
        disabled={!canJoin || isJoined}
      />
    // </div>
  );
}
