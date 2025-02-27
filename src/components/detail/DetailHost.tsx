// 주최자 프로필 컴포넌트
import { cn } from "@/utils/detail/cn";
import Image from "next/image";
import { ChipSmallSquircle } from "./ChipSmallSquircle";
import { DEFAULT_IMAGE } from '@/constants/detail/detail.const';
import { ChipSmallRound } from "./ChipSmallRound";
import { EPosition } from "@/types/supabase/supabase-custom.type";
import { getPosition } from "@/utils/detail/enums";

export interface IDetailHostProps {
  nickname: string;
  introduction?: string | null;
  tags?: string[] | null;
  position?: EPosition;
  image?: string | null;
  className?: string;
}

export const DetailHost: React.FC<IDetailHostProps> = ({ 
  nickname, 
  introduction = "안녕하세요 주최자 두두입니다!", 
  tags = [], 
  position,
  image,
  className
}) => {
  return (
    <div className="relative flex flex-col">
      <div className="relative w-fit mt-5 lg:mt-8 px-2 font-semibold text-body-1-reading text-gray800">
        {"주최자 프로필"}
      </div>

        <div className="flex w-full min-h-27 p-5 lg:px-6 lg:py-8 flex-col gap-2.5 items-start bg-background400 rounded-xl mt-4">
          <div className="flex w-full flex-col gap-5 items-start">
            {/* 프로필 영역 */}
            <div className="flex gap-3.5 items-center w-full">
              {/* 프로필 이미지 */}
              <div className="w-12 h-12 shrink-0 relative rounded-full overflow-hidden">
                <Image
                  src={ image || DEFAULT_IMAGE.PROFILE}
                  alt={"주최자 프로필 이미지"}
                  fill
                  className="object-cover"
                />
            </div>

            {/* 주최자 소개 텍스트 */}
            <div className="flex flex-col gap-0.5">
              <div className="flex gap-1 items-center">
                  <span className="text-body-2-normal font-medium text-gray800">
                    {nickname}
                  </span>
                  {position && (
                  <ChipSmallRound 
                    variant="gray"
                    // text="PM"  
                    text={getPosition(position)}
                    />
                  )}
              </div>
              <span className="text-label-normal text-gray400">
                {introduction}
              </span>
            </div>

            </div>

            {/* 주최자 태그 */}
            {tags && tags.length > 0 && (
            <div className="flex gap-1 items-center">
              {tags.map((tag, index) => (
              <ChipSmallSquircle
                key={`tag-${index}`}
                text={tag}
                variant='tag'
                className={cn("text-gray300")}
              />
              ))}
            </div>
            )}

          </div>
        </div>
      </div>
  );
};