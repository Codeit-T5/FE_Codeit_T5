// 찜하기 버튼 컴포넌트
import { HeartIcon } from "./icons/HeartIcon";
import { HeartEmptyIcon } from "./icons/HeartEmptyIcon";

interface ILikeButton {
  onHeartClick: () => void;
  isLiked?: boolean;
}
export const LikeButton = ({ onHeartClick, isLiked = false }: ILikeButton) => {

  return (
    <button
          onClick={onHeartClick}
          className={`flex items-center justify-center w-[72px] h-14 p-4 rounded-2xl bg-gray100 transition-all duration-200 hover:bg-gray200    
          `} 
          aria-label="찜하기"
        >
          <div className={`relative w-5 h-5
                          ${
                            isLiked ? 'text-red200' : 'text-gray300'
                          }
            `}>
            <div
              className={`absolute transition-opacity duration-200  ${
                isLiked ? 'opacity-100 scale-110' : 'opacity-0'
              }`}
            >
              <HeartIcon />
            </div>
            <div
              className={`absolute inset-0 transition-opacity duration-200 ${
                isLiked ? 'opacity-0' : 'opacity-100 scale-110'
              }`}
            >
              <HeartEmptyIcon />
            </div>
          </div>
        </button>
  )
}