import { Header } from '../detail/Header';
import { GatheringSkeleton } from '../mypage/gatheringCard/GatheringCard';

export const MyLikeSkeleton = () => {
  return (
    <div className="w-full min-h-screen mx-auto px-4 md:px-20 bg-background200 xs:max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
      <Header />
      <div className="flex flex-col gap-4 md:gap-6 lg:grid lg:grid-cols-2">
        <GatheringSkeleton />
        <GatheringSkeleton />
      </div>
    </div>
  );
};
