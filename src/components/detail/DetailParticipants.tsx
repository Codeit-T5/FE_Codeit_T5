// 현재 참여 인원수와 참여 유저 목록을 알 수 있는 컴포넌트입니다.
import React from "react";
import { cn } from "@/utils/detail/cn";
import { ParticipantsProgress } from "./ParticipantsProgress";
import { ParticipantsList } from "./ParticipantsList";
import { TParticipatedUserClient } from "@/types/supabase/supabase-custom.type";

interface IDetailParticipantsProps {
  participants: TParticipatedUserClient[];
  maxParticipants: number;
  minParticipants: number;
  currentParticipants: number;
  className?: string;
}
export const DetailParticipants: React.FC<IDetailParticipantsProps> = ({
  participants,
  maxParticipants,
  minParticipants,
  currentParticipants,
  className
}) => {
  return (
    <div 
      className={cn("relative flex flex-col gap-4 px-5 py-5 mt-5 lg:px-6 lg:py-8 lg:mt-8 bg-background400 rounded-2xl items-center", className)}
    >
        {/* 참여 인원수 Progress Bar */}
        <ParticipantsProgress
          currentCount={currentParticipants}
          minParticipants={minParticipants}
          maxParticipants={maxParticipants}
        />

        {/* 참여 유저 목록 */}
        <ParticipantsList 
          participants={participants}
          maxParticipants={maxParticipants}
        />
    </div>
  );
};