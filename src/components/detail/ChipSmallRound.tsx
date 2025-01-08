import React from "react";
import { cn } from "@/lib/utils";
import { IChipSmallRound } from "@/types/detail";

export const ChipSmallRound: React.FC<IChipSmallRound> = ({
  text,
  variant,
  className,
}) => {
  return (
    <div 
      className={cn(
        'px-2 py-1 rounded-full text-caption-normal', 
        variant === 'gray' && 'bg-[#D5D3D0]',
        className
      )}
    >
      {text}
    </div>
  );
};
