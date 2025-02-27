import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/detail/cn";
import { TReviewClient } from "@/types/supabase/supabase-custom.type";
import { DEFAULT_IMAGE } from "@/constants/detail/detail.const";
import { DuduEmpty } from "./icons/DuduEmpty";
import { ChipSmallRound } from "./ChipSmallRound";
import { getRate, getRateVariant } from "@/utils/detail/enums";
import { formatDate } from "@/utils/detail/date";

// 모임 리뷰 리스트에 들어갈 리뷰 아이템 컴포넌트
interface IReviewItemProps {
  review: TReviewClient;
  className?: string;
}

const ReviewItem: React.FC<IReviewItemProps> = ({ review, className }) => {
  // 작성자 이미지 로딩 실패시 기본 이미지를 보여줌
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_IMAGE.PROFILE;
  };
  return (
    <div
      className={cn("relative flex flex-col min-h-[124px] gap-3 lg:gap-[14px] px-4 py-[18px] lg:px-6 lg:py-7 mt-4 bg-background400 rounded-2xl", className)}
    >
        {/* 감정표현 칩 */}
        <div className="flex gap-0.5">
          <ChipSmallRound 
            variant={getRateVariant(review.rate)}
            text={getRate(review.rate)}
          />
        </div>

        {/* 후기 텍스트 */}
        <p className="text-label-reading text-gray400 truncate">
          {review.review}
        </p>
      
        {/* 리뷰 작성자 정보*/}
        <div className="flex items-center justify-end gap-2">
          {/* 작성자 프로핊사진 */}
            <div className="h-6 w-6 overflow-hidden rounded-full">
              <Image 
                src={review.userImage || DEFAULT_IMAGE.PROFILE}
                alt={`${review.userNickname}의 프로필`}
                className="h-full w-full object-cover"
                width={6}
                height={6}
                onError={handleImageError}
              />
          </div>

          {/* 작성자 이름 */}
          <div className="flex items-center gap-2 text-caption-normal text-gray300">
            <span>{review.userNickname}</span>
            <div className="h-2 w-px bg-gray200"></div>
            <span>{formatDate(review.createdAt)}</span>
          </div>

        </div>
    </div>
  );
};

// 리뷰 아이템들을 포함한 리뷰 섹션 컴포넌트
interface IDetailReviewProps {
  reviews: TReviewClient[];
  totalReviews: number;
  className?: string;
}
export const DetailReview: React.FC<IDetailReviewProps> = ({ 
  reviews,
  totalReviews,
  className,
  }) => {    
  /// 리뷰 아이템 추가 로드
  // 한 페이지에 보여줄 리뷰 개수
  const REIVEW_ITEMS_PER_PAGE = 3;
  // 현재 보여줄 리뷰 개수 상태
  const [visibleCount, setVisibleCount] = useState(REIVEW_ITEMS_PER_PAGE);
  // 현재 보여줄 리뷰들 개수만큼 슬라이스
  const visibleReivews = reviews.slice(0, visibleCount);
  // 더 보여줄 리뷰가 있는지 확인
  const hasMoreReivews = visibleCount < reviews.length;
  // '후기 더보기' 버튼
  const handleLoadMore = () => {setVisibleCount(prev => prev + REIVEW_ITEMS_PER_PAGE)};

    // 리뷰가 없을 때의 빈 화면 UI
        if (!reviews || reviews.length === 0) {
          return (
            <div className="relative flex flex-col">
              {/* 타이틀 */} 
                  <div className="relative w-fit mt-4 lg:mt-8 px-2 font-semibold text-gray800 text-body-1-reading">
                    {"모임 후기"}
                    <span className="ml-2 text-orange200">
                      {reviews.length}
                    </span>
                  </div>
                {/* 빈 화면 UI */}
                <div className="relative flex flex-col items-center justify-center py-16">
                  <DuduEmpty />
                  <p className="mt-4 text-gray400 text-caption-normal">
                    아직 작성된 리뷰가 없어요
                  </p>
                </div>
            </div>
          );
        }
        // 리뷰가 있을 때 UI
        return (
          <div className="relative flex flex-col">
            {/* 타이틀 */}
            <div className="relative w-fit mt-5 lg:mt-8 px-2 font-semibold text-gray800 text-body-1-reading">
              {"모임 후기"}
              <span className="ml-2 text-orange200">
                {reviews.length}
              </span>
            </div>

            {/* 리뷰 리스트 */}
            <div>
              {visibleReivews.map((review, index) => (
                <ReviewItem key={index} review={review} className={className} />
              ))}
            </div>

            <button 
              onClick={handleLoadMore}
              className="w-full h-12 rounded-[14px] py-[14px] mt-[14px] lg:mt-6 text-body-2-normal font-semibold text-gray400 bg-gray100"
              disabled={!hasMoreReivews}
            >
              후기 더보기
            </button>

          </div>
        )
  }