// 신청하기 버튼 컴포넌트
interface IJoinButton {
  onJoinClick: () => void;
  isJoining?: boolean;
  actionLabel?: string;
  disabled?: boolean;
  className?: string;
}

export const JoinButton = ({ 
  onJoinClick,
  isJoining = false,
  actionLabel,
  disabled = false,
  className,
}: IJoinButton) => {

  return (
      <button 
          onClick={onJoinClick}
          disabled={disabled}
          className="flex-1 h-14 min-w-65 bg-gray950 rounded-2xl text-gray200 text-body-1-normal font-semibold  hover:bg-gray800 transition-all duration-200 disabled:bg-gray400 disabled:cursor-not-allowed"
        >
          {actionLabel}
      </button>
  )
}