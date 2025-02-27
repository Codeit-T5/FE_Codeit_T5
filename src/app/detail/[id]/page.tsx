// app/detail/[id]/page.tsx
import { getDetail } from '@/apis/detail/detail.api';
import DetailContainer from '@/containers/detail/DetailContainer';
import { QueryClient } from '@tanstack/react-query';
import { Suspense } from "react";
import { IMoimMasterResponse } from '@/types/detail/t-moim';
import { DetailSkeleton } from '@/components/detail/DetailSkeleton';
import { QUERY_KEYS } from '@/constants/detail/detail.const';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params } : DetailPageProps) {
  const queryClient = new QueryClient();

  // Dynamic route parameters 사용을 위해 비동기 처리
  // const { id: moimId } = await Promise.resolve(params);
  const { id: moimId } = await params;

  // 서버에서 초기 데이터 prefetching
  try {
    await 
    queryClient.prefetchQuery<IMoimMasterResponse>({
      queryKey: QUERY_KEYS.MOIM_DETAIL(moimId),
      queryFn: () => getDetail(moimId),
    })
  } catch (error) {
    console.error('Prefetch 에러 발생:', error);
  }

  return (
    <div>
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
        <Suspense fallback={<DetailSkeleton />}>
            <DetailContainer moimId={moimId} />
        </Suspense>
      {/* </HydrationBoundary> */}
    </div>
  );
};