'use client';
import MyLikePresenter from '@/components/mylike/MyLikePresenter';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useLikedMoims } from '@/hooks/mylike/useLikedMoims';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeApi } from '@/apis/detail/detail.api';
import { toast } from 'sonner';
import { DuduEmpty } from '@/components/detail/icons/DuduEmpty';
import { useAuth } from '@/hooks/auth/auth.hook';
import { MyLikeSkeleton } from '@/components/mylike/MyLikeSkeleton';
import { CheckCircle, XCircle } from 'lucide-react';
import { Header } from '@/components/detail/Header';

export default function MyLikeContainer() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isMeLoading } = useAuth();

  const { moims, isLoading, error, fetchNextPage, hasNextPage, isEmpty } = useLikedMoims();

  // 찜하기 취소 뮤테이션
  const unlikeMutation = useMutation({
    mutationFn: (moimId: string) => likeApi.unlike(moimId),
    onSuccess: () => {
      // 찜 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['liked-moims'] });
    },
    onError: (error) => {
      console.error('찜하기 취소 실패:', error);
    },
  });

  // 모임 카드 클릭
  const handleClickCard = (moimId: string) => {
    router.push(`/detail/${moimId}`);
  };

  const handleRemoveLike = async (e: React.MouseEvent, moimId: string) => {
    e.stopPropagation();
    try {
      await unlikeMutation.mutateAsync(moimId);
      toast.success('찜하기가 취소되었습니다', {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      });
    } catch (error) {
      console.error('찜하기 취소 실패:', error);
      toast.error('잠시후 시도해주세요', {
        icon: <XCircle className="w-5 h-5 text-red-500" />,
      });
    }
  };

  if (isLoading || isMeLoading) {
    return <MyLikeSkeleton />;
  }
  if (error) {
    return (
      <div>
        <DuduEmpty />
      </div>
    );
  }

  // if (moims.length === 0) {
  if (isEmpty) {
    return (
      <div className="w-full min-h-screen mx-auto px-4 md:px-20 bg-background200 xs:max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
        <Header />
        <div className="pt-[14px] relative flex flex-col items-center">
          <DuduEmpty />
        </div>
        <div className="text-center text-gray600 text-caption-normal">찜한 모임이 없습니다.</div>
      </div>
    );
  }

  return (
    <>
      <MyLikePresenter
        moims={moims || []}
        onRemoveLike={handleRemoveLike}
        onClickCard={handleClickCard}
      />
    </>
  );
}
