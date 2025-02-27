// components/detail/DetailPresenter.tsx
// 상세페이지 전체 UI 렌더링을 담당하는 컴포넌트
'use client';
// components
import { Header } from '@/components/detail/Header';
import { DetailHost } from '@/components/detail/DetailHost';
import { DetailShare } from '@/components/detail/DetailShare';
import { FloatingBar } from '@/components/detail/FloatingBar';
import { ImageBox } from '@/components/detail/ImageBox';
import { DetailContent } from '../../components/detail/DetailContent';
import { DetailInfo } from '../../components/detail/DetailInfo';
import { DetailParticipants } from '../../components/detail/DetailParticipants';
import { DetailReview } from '../../components/detail/DetailReview';
// types
import { IDetailPresenterProps } from '@/types/detail/i-presenter';
// constants
import { DEFAULT_IMAGE } from '@/constants/detail/detail.const';

export default function DetailPresenter({
  data,
  masterUser,
  participants,
  reviews,
  isJoining,
  isLiked,
  onJoin,
  onLikeToggle,
  actionLabel = '신청하기',
  disabled = false,
  className,
}: IDetailPresenterProps) {
  if (!data || !masterUser) {
    return null;
  }
  return (
    <div className="w-full min-h-screen mx-auto px-4 pb-[92px] bg-background200 xs:max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
        <Header />
        <DetailShare />
        <ImageBox image={data.image} />
        <DetailInfo 
          title={data.title}
          address={data.address || '온라인으로 진행합니다'}
          createdAt={data.createdAt}
          startDate={data.startDate}
          recruitmentDeadline={data.recruitmentDeadline}
          endDate={data.endDate}        
          participants={data.participants}
          minParticipants={data.minParticipants}
          maxParticipants={data.maxParticipants}
          moimType={data.moimType}
          isConfirmed={data.isConfirmed}
          status={data.status}
        />
        <DetailParticipants 
          participants={data.participatedUsers}
          maxParticipants={data.maxParticipants}
          minParticipants={data.minParticipants}
          currentParticipants={data.participants}
        />
        <DetailContent 
          content={data.content}
        />
        <DetailHost 
          // nickname="두두씨"
          nickname={masterUser.nickname}
          // introduction="안녕하세요! 기획하는 두두입니다."
          introduction={masterUser?.introduction || '안녕하세요!'}
          // tags={['기획', '마케팅', '자기계발']}
          tags={masterUser?.tags || []}
          image={ masterUser?.image || DEFAULT_IMAGE.PROFILE}
        />
        <DetailReview 
          reviews={data.reviews}
          totalReviews={data.reviewsCount}
        />
        <FloatingBar
          onHeartClick={onLikeToggle}
          onJoinClick={onJoin}
          isLiked={isLiked}
          isJoining={isJoining}
          actionLabel={actionLabel}
          disabled={disabled}
        />
    </div>
  );
}