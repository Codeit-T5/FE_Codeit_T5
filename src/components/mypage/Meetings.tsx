import { GatheringCard, GatheringSkeleton } from '@/components/mypage/gatheringCard/GatheringCard';
import Image from 'next/image';
import Link from 'next/link';
import emptyDudu from '@public/images/mypage/dudu-empty.svg';
import { useParticipatedMoimQuery } from '@/hooks/mypage/queries/useMoimsQuery';
import emptyHeart from '@public/images/mypage/empty-heart.svg';
// import fullHeart from '@public/images/mypage/heart.svg';

export default function Meetings() {
  const { data, isLoading } = useParticipatedMoimQuery();

  if (isLoading) {
    return <GatheringSkeleton />;
  }

  console.log(data);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image src={emptyDudu} alt="empty" width={180} height={180} priority />
          <p className="text-body-2-reading text-gray300">아직 내 모임이 없어요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
      {data.map((moim) => (
        <div key={moim.moimId}>
          <GatheringCard moim={moim} />
        </div>
      ))}
    </div>
  );
}
