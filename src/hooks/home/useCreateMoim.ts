import { useRouter } from "next/navigation";
import axiosHomeInstance from "@/libs/home/home-axios";
import { useMakeStore } from "@/stores/make/makeStore";
import { useQueryClient } from "@tanstack/react-query"; // ✅ React Query 클라이언트 추가

export function useCreateMoim() {
  const router = useRouter();
  const queryClient = useQueryClient(); // ✅ React Query 클라이언트 가져오기

  const createMoim = async () => {
    const currentState = useMakeStore.getState();
    const moimData = {
      title: currentState.title,
      content: currentState.content,
      roadAddress: currentState.roadAddress,
      recruitmentDeadline: currentState.recruitmentDeadline,
      startDate: currentState.startDate,
      endDate: currentState.endDate,
      minParticipants: currentState.minParticipants,
      maxParticipants: currentState.maxParticipants,
      moimType: currentState.type.toUpperCase(),
      status: 'RECRUIT',
    };

    const formData = new FormData();
    formData.append('moim_json', JSON.stringify(moimData));
    if (currentState.image) {
      formData.append('moim_image', currentState.image);
    }

    try {
      const response = await axiosHomeInstance.post('/moims', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.moimId) {
        alert('모임 생성에 성공했습니다!');
        
        // 새로운 모임 데이터가 즉시 반영되도록 캐시 무효화
        await queryClient.invalidateQueries({ queryKey: ['moims'] });

        useMakeStore.getState().reset();
        router.push('/');
      } else {
        alert('모임 생성에 실패했습니다.');
      }
    } catch (error: any) {
      console.error('모임 생성 실패:', error);
      alert('모임 생성 중 문제가 발생했습니다.');
    }
  };

  return { createMoim };
}
