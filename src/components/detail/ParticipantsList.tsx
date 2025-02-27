// 모임 참여 신청을 한 유저들의 목록을 보여주는 컴포넌트입니다.
import React, { useState } from 'react';
import { cn } from "@/utils/detail/cn";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/detail/HoverCardUI"
import { TParticipatedUserClient } from '@/types/supabase/supabase-custom.type';
import { DEFAULT_IMAGE } from '@/constants/detail/detail.const';
import { ProfileImage } from './ProfileImage';

interface IPartcipantsListProps {
  participants: TParticipatedUserClient[];
  maxParticipants: number;
  className?: string;
}
export const ParticipantsList: React.FC<IPartcipantsListProps> = ({
  participants,
  maxParticipants,
  className,
}) => {
  // 참가 신청 유저 프로필배지 섹션 (프로필배지 4개 + 나머지 참여자 수)
  const [isHovered, setIsHovered] = useState(false);  // 프로필배지 hover하면 모든 참가자 프로필 보임
  const visibleParticipants = participants.slice(0, 4);   // hover 전에 보이는 참가자 프로필 배지(4개)
  const remainingCountOfParticipants = participants.length - 4;  // 숨겨진 참가자 프로필 수
  
  // 추가 참가신청 가능 인원수 계산
  const availableCount = Math.max(0, maxParticipants - participants.length);

  // 작성자 이미지 로딩 실패시 기본 이미지를 보여줌
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_IMAGE.PROFILE;
  };

    return (
      <div className="flex justify-between items-center w-full">
            <HoverCard closeDelay={300}>
              <HoverCardTrigger asChild>
                <div
                  className={cn("flex -space-x-2")}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {visibleParticipants.map((participant) => (
                  <div
                    key={participant.userUuid}
                    className="relative w-8 h-8"
                  >
                    <div className="absolute w-8 h-8 rounded-full border-2 border-background200 overflow-hidden">
                      <ProfileImage
                        src={participant.userImage } // || DEFAULT_IMAGE.PROFILE
                        alt={participant.userNickname || "참가자 프로필"}
                        width={32}
                        height={32}
                        className="object-cover"
                        // onError={handleImageError}
                      />
                    </div>
                  </div>
                ))}

                {remainingCountOfParticipants > 0 && (
                  <div className="relative w-8 h-8 flex items-center justify-center bg-background200 rounded-full border-2 border-background200">
                    <span className="text-xs text-gray400 font-medium">
                      +{remainingCountOfParticipants}
                    </span>
                  </div>
                )}
              </div>
              </HoverCardTrigger>

              <HoverCardContent
                className="w-[156px] px-1.5 py-3 bg-background100"
                align="start"
              >
                <div className="space-y-2">
                  {participants.map((participant) => (
                    <div
                      key={participant.userUuid}
                      className="flex items-center gap-2 p-1 h-[36px]"
                    >
                      <ProfileImage
                        src={participant.userImage}
                        alt={participant.userNickname || '참가자 프로필'}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-caption-normal text-gray400 font-medium">
                        {/* 닉네임 */}
                        {participant.userNickname || '닉네임'}
                      </span>
                    </div>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>

      {/* 추가 참가신청 가능 인원 */}
      <span className="text-body-2-normal font-semibold text-orange200">
        {availableCount}명 더 참여할 수 있어요
      </span>
    </div>
  );
};