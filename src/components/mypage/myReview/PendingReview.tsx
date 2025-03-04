import { GatheringCard } from '@/components/mypage/gatheringCard/GatheringCard';
import { GatheringSkeleton } from '@/components/mypage/gatheringCard/GatheringCard';
import { useParticipatedMoimQuery } from '@/hooks/mypage/queries/useMoimsQuery';
import { IParticipatedUser } from '@/types/mypage/user';
import Image from 'next/image';

interface Props {
  // moim?: IMyMoim;
  participatedUser?: IParticipatedUser;
}

export default function PendingReview({ participatedUser }: Props) {
  const { data, isLoading } = useParticipatedMoimQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 max-w-[960px] 2xl:grid 2xl:grid-cols-2 ">
        <GatheringSkeleton />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[400px]">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image
            src="/images/mypage/dudu-empty.svg"
            alt="empty"
            width={180}
            height={180}
            priority
          />
          <p className="text-body-2-reading text-gray300">아직 작성 가능한 리뷰가 없어요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-[960px] 2xl:grid 2xl:grid-cols-2">
      {data
        ?.filter(
          (moim) =>
            moim.status === 'END' &&
            !moim.reviews.some((review) => review.userUuid === participatedUser?.userUuid),
        )
        .map((moim) => (
          <div key={moim.moimId} className="relative">
            <GatheringCard moim={moim} showInReviewTab={true} />
          </div>
        ))}
    </div>
  );
}
