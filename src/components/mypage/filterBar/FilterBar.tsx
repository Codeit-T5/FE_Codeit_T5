import { Switch } from '@/components/mypage/filterBar/switch/switch';
import DropDown from '@/components/mypage/filterBar/dropDown/DropDown';
import Filter from '@/components/mypage/filterBar/filter/Filter';

export default function FilterBar() {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-1.5">
        <Filter />
        <DropDown />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-body-2-reading text-gray400">개설확정</span>
        <Switch />
      </div>
    </div>
  );
}
