// 모임 참여 현황을 알 수 있는 Progress Bar 컴포넌트입니다.
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Progress } from '@/components/detail/DetailProgress';
import { FireIcon } from './icons/FireIcon';

interface IParticipantsProgressProps {
  currentCount: number;
  minParticipants: number;
  maxParticipants: number;
  className?: string;
}

export const ParticipantsProgress: React.FC<IParticipantsProgressProps> = ({
  currentCount,
  minParticipants,
  maxParticipants,
  className
}) => {
  // 실제 참여 인원수
  const targetProgress = (currentCount / maxParticipants) * 100;

  // 렌더링 시 progress bar가 채워지는 애니메이션 효과
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // 컴포넌트가 마운트 되면 애니메이션이 시작
  useEffect(() => {
    const timer = setTimeout(() => {    // 완전히 마운트되기를 기다린 후 애니메이션 시작
      setAnimatedProgress(targetProgress);
    }, 100);

    return () => clearTimeout(timer);
  }, [targetProgress]);

  const isMinimumMet = currentCount >= minParticipants;   // 모임 개설 최소인원 3명

  return (
    <div className="w-full space-y-2">
      {/* 참여 신청한 인원 */}
      <div className="flex flex-col">
        <span className="font-semibold text-body-2-normal text-gray800">
          {`${currentCount}명 참여중`}
        </span>
      </div>

      <div className="relative">
            <Progress 
              value={animatedProgress}
              className="h-3 rounded-full bg-gray200"
              progressColor={isMinimumMet ? "bg-brown400" : "bg-gray500"}   // 최소인원 달성 시 주황색
            />

            {/* Fire 아이콘 */}
            <div className="absolute top-0.5 -translate-y-1/2"  // progress bar의 위치에 따라 Fire 아이콘 이동
              style={{ 
                left: `${animatedProgress}%`,
                transform: `translate(-50%, -50%)`,
                transition: 'left 1s cubic-bezier(0.4, 0, 0.2, 1)' // Fire 아이콘의 이동에도 애니메이션을 적용하기 위해 progress bar와 동일한 함수 사용

              }}
            >
              <FireIcon />
            </div>
      </div>

      {/* 최소, 최대 인원 */}
      <div className="flex justify-between text-xs">
        <span className="text-caption-normal font-medium text-gray500">
          {/* {"최소인원 3명"} */}
          {`최소인원 ${minParticipants}명`}
        </span>
        <span className="text-caption-normal font-medium text-gray500">
          {`최대인원 ${maxParticipants}명`}
        </span>
      </div>
      
    </div>
  )

}
