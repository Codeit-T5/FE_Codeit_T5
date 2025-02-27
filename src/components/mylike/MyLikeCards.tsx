'use client';
// import { useFilterStore } from '@/stores/home/filterStore';
import MyLikeCard from './MyLikeCard';
import { IMoimDetail } from '@/types/detail/t-moim';

interface IMyLikeCards {
  moims: IMoimDetail[];
  // moims: any[];
  onRemoveLike: (e: React.MouseEvent, moimId: string) => void;
  onClickCard: (moimId: string) => void;
}
export default function MyLikeCards({ moims, onRemoveLike, onClickCard }: IMyLikeCards) {

  return (
      <div className="flex flex-col gap-4 md:gap-6 lg:grid lg:grid-cols-2 pt-[14px]">
        {moims.map((moim) => (
          <MyLikeCard 
            key={moim.moimId} 
            moim={moim} 
            onClick={() => onClickCard(moim.moimId)}
            onRemoveLike={(e) => onRemoveLike(e, moim.moimId)}
          />
        ))}
      </div>
  );
}
