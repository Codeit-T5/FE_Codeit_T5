import React from "react";
import { ChipSmallSquircle } from "./ChipSmallSquircle";
import { ChipSmallRound } from "@/components/detail/ChipSmallRound";
import { Separator } from "@/components/ui/separator"
import { cn } from "@/utils/detail/cn";
import { getMoimTypeText } from "@/utils/detail/enums";
import { formatDate, getDeadlineText } from "@/utils/detail/date";

interface IDetailInfoProps {
  title: string;
  address: string;
  createdAt: string;
  recruitmentDeadline: string;
  startDate: string;
  endDate: string;
  participants: number;
  minParticipants: number;
  maxParticipants: number;
  // moimType: ECategory;
  // status: EMoimStatus;
  moimType: string;
  status: string;
  isConfirmed: boolean;
  className?: string;
}
export const DetailInfo: React.FC<IDetailInfoProps> = ({
  title,
  address,
  createdAt,
  recruitmentDeadline,
  startDate,
  endDate,
  participants,
  maxParticipants,
  minParticipants,
  moimType,
  status,
  isConfirmed,
  className,
}) => {
  const getStatusTag = (status: string) => {
    if (status === 'END') {
      return '종료';
    } else if (maxParticipants === participants) {
      return '모집완료';
    } else if (isConfirmed === false) {
      return '모집중';
    };
    return '모집중';
  }
  return (
    <div className={cn(
      "relative flex flex-col gap-2.5 px-4 py-5 mt-4 lg:px-6 lg:py-8 lg:mt-8 bg-background400 rounded-2xl",
      className
    )}
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-1.5">
          {isConfirmed && ( <ChipSmallSquircle variant="dark" text="개설 확정" /> )}
          <ChipSmallSquircle variant="light" text={getMoimTypeText(moimType)} />
          {/* {online && ( <ChipSmallSquircle variant="light" text="온라인" /> )} */}
          {getStatusTag  && ( <ChipSmallSquircle variant="light" text={getStatusTag(status)} /> )}
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-body-1-normal font-medium text-textNormal truncate">
            {title}
          </h3>
          <p className="text-caption-normal text-gray500 font-medium truncate">
            {address}
          </p>
        </div>

        <div className="flex flex-col gap-[0.5px]">
          <div className="flex items-center gap-2 w-full">
            <span className="text-caption-normal font-medium text-gray500">
              {"모집 일정"}
            </span>
            <Separator orientation="vertical" className="h-2 bg-gray200" />
            <span className="text-caption-normal font-medium text-gray500">
              {`${formatDate(createdAt)} - ${formatDate(recruitmentDeadline)}`}
            </span>
            <span>
              <ChipSmallRound variant="gray" text={getDeadlineText(recruitmentDeadline)} />
            </span>
          </div>
          <div className="flex items-center gap-2 max-w-[255px]">
            <span className="text-caption-normal font-medium text-gray500">
              {"모임 날짜"}
            </span>
            <Separator orientation="vertical" className="h-2 bg-gray200" />
            <span className="text-caption-normal font-medium text-gray500 flex-1">
            {`${formatDate(startDate)} - ${formatDate(endDate)}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
