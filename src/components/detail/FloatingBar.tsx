// 상세페이지 하단 찜하기, 신청하기 버튼이 있는 플로팅 바 컴포넌트입니다.
import { LikeButton } from "./LikeButton";
import { JoinButton } from "./join/JoinButton";

interface IFloatingBar {
  onHeartClick: () => void;
  onJoinClick: () => void;  
  isJoining?: boolean;
  isLiked?: boolean;
  actionLabel?: string;
  disabled?: boolean;
}

export const FloatingBar = ({
  onHeartClick,
  onJoinClick,
  isJoining = false,
  isLiked = false,
  actionLabel = '신청하기',
  disabled = false
}: IFloatingBar) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full mx-auto h-19 p-4 bg-background200 shadow-2xl rounded-2xl xs:max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
      <div className="flex items-center gap-3">
        {/* 찜하기 버튼 */}
        <LikeButton 
          onHeartClick={onHeartClick}
          isLiked={isLiked}
        />
        {/* 신청하기 버튼 */}
        <JoinButton 
          onJoinClick={onJoinClick}
          isJoining={isJoining}
          actionLabel={actionLabel}
          disabled={disabled}
        />
      </div>
    </div>
  );
};