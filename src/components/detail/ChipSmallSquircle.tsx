import React from "react";
import { cn } from "@/lib/utils";
import { IChipSmallSquircle } from "@/types/detail/i-components";

export const ChipSmallSquircle: React.FC<IChipSmallSquircle> = ({
  text,
  variant,
  className,
}) => {
  return (
    <div 
      className={cn(
        'px-2 py-1 rounded-md text-xs font-medium', 
        variant === 'light' && 'bg-background200 text-caption-normal text-gray800',
        variant === 'dark' && 'bg-gray800 text-caption-normal text-gray50',
        variant === 'tag' && 'bg-background300 text-caption-normal',
        variant === 'emotion' && 'bg-background300 text-cation-normal, text-red200',
        variant === 'cardTag' && 'bg-background400 text-caption-normal text-gray800',
        variant === 'end' && 'text-caption-normal bg-red200 text-red100',
        className
      )}
    >
      {text}
    </div>
  );
};
