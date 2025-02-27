/**  shadcn progress 바 컴포넌트
 * - progressColor prop 추가하여 Indicator의 배경색을 외부에서 제어할 수 있게 변경
 */

"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
  & {
    progressColor?: string;   // progressColor prop 추가하여 Indicator의 배경색을 외부에서 제어할 수 있게함
  }

>(({ className, value, progressColor, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-full w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 transition-all",
        progressColor || "bg-primary"
      )}
      style={{ 
        transform: `translateX(-${100 - (value || 0)}%)`,
        transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
