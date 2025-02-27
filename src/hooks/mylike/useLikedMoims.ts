import { useInfiniteQuery } from '@tanstack/react-query';
import { likeApi } from '@/apis/detail/detail.api';
import { useAuth } from '../auth/auth.hook';

export function useLikedMoims() {
  const { me } = useAuth();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useInfiniteQuery({
    queryKey: ['liked-moims'],
    queryFn: ({ pageParam = 1 }) => likeApi.getMyLikes(pageParam as number),
    getNextPageParam: (lastPage) => 
      lastPage.pagination.currentPage < lastPage.pagination.totalPages
        ? lastPage.pagination.currentPage + 1
        : undefined,
    initialPageParam: 1,
    enabled: !!me,
  });

  const moims = data?.pages.flatMap(page => page.data) ?? []; // 전체 모임 데이터를 단일 배열로 변환

  const pagination = data?.pages[0]?.pagination;    // 페이지네이션 정보
  return {
    moims,
    pagination,
    isLoading: isLoading,
    error,
    fetchNextPage: fetchNextPage,
    hasNextPage: hasNextPage,
    isFetchingNextPage: isFetchingNextPage,
    isEmpty: moims.length === 0 && !isLoading,
  }
}