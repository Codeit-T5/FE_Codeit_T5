'use client';
import React from 'react';
import { ChipSmallSquircle } from '../detail/ChipSmallSquircle';
import { HeartIcon } from '../detail/icons/HeartIcon';
import { Separator } from '../ui/separator';
import { formatDate } from '@/utils/detail/date';
import { getMoimTypeText } from '@/utils/detail/enums';
import { IMoimDetail } from '@/types/detail/t-moim';
import Image from 'next/image';

interface IStatusInfo {
  text: string;
  variant: 'end' | 'cardTag';
}

interface IMyLikeCardProps {
  moim: IMoimDetail;
  // moim: any;
  onClick: () => void;
  onRemoveLike: (e: React.MouseEvent) => void;
}

export default function MyLikeCard({ moim, onClick, onRemoveLike }: IMyLikeCardProps) {
  const {
    moimId,
    moimType,
    title,
    address,
    startDate,
    endDate,
    recruitmentDeadline,
    participants,
    minParticipants,
    maxParticipants,
    status,
    likes,
  } = moim;

  const isConfirmed = participants >= minParticipants;
  const getStatusInfo = (status: string, maxParticipants: number, participants: number, isConfirmed: boolean): IStatusInfo => {
    if (status === 'END') {
      return {
        text: '종료',
        variant: 'end'
      };
    } else if (maxParticipants === participants) {
      return {
        text: '모집완료',
        variant: 'cardTag'
      };
    } else if (isConfirmed === false) {
      return {
        text: '모집 중',
        variant: 'cardTag'
      };
    };
    return {
      text: '모집 중',
      variant: 'cardTag'
    };
  }
  const statusInfo = getStatusInfo(status, maxParticipants, participants, isConfirmed);

  return (
    <div
      onClick={onClick}  
      className="relative flex flex-col w-full items-start bg-white rounded-2xl shadow-sm cursor-pointer transition-all hover:shadow-md"
    >
      <div className="flex items-center p-4 lg:p-0 lg:px-6 lg:py-7 w-full">
        <div className="flex gap-5 items-start w-full">
          <div className="w-9 h-9">
            <Image
              src={`/svgs/ic_color-${moimType}.svg`}
              alt={`${moimType} icon`}
              width={36}
              height={36}
              priority
            />
          </div>
          <div className="flex flex-col flex-1">
            {/* 태그, 찜 버튼 */}
            <div className="flex flex-col">
              <div className="flex justify-between items-start">
                <div className="flex gap-1 flex-wrap">
                  <ChipSmallSquircle text={getMoimTypeText(moimType)} variant="cardTag" />
                  {isConfirmed && ( <ChipSmallSquircle text="개설확정" variant="dark" /> )}
                  {statusInfo  && ( <ChipSmallSquircle variant={statusInfo.variant} text={statusInfo.text} /> )}
                </div>

                {/* 찜버튼 */}
                <button
                  onClick={onRemoveLike}
                  className="p-1 hover:bg-gray50 rounded-full transition-colors"
                >
                  <HeartIcon />
                </button>
              </div>

              {/* 모임 타이틀, 장소 */}
              <div className="flex flex-col">
                <h3 className="text-body-1-normal font-medium pt-2 lg:pt-3">
                  {title}
                </h3>
                <div className="text-label-normal text-gray400 flex pt-1 lg:pt-2">
                  <span>
                  {address || '온라인으로 진행합니다'}
                  </span>
                  <span className="mx-2 text-gray300 flex flex-shrink-0 items-center">
                    <Separator orientation="vertical" className="h-2 bg-gray200" />
                  </span>
                  <span className="flex-shrink-0">
                  {`${participants}명 참여`}
                  </span>
                </div>
              </div>

                {/* 날짜 */}
                <div className="text-caption-normal text-gray500 font-medium pt-3 lg:pt-5">
                  {`${formatDate(startDate)} - ${formatDate(endDate)}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}
