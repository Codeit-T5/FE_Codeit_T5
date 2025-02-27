// 모임 상세 데이터 조회 훅
import { getDetail } from '@/apis/detail/detail.api';
import { IMoimMasterResponse } from '@/types/detail/t-moim';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/detail/detail.const';
import { TMe } from '@/types/auth/auth.type';

interface UseMoimDetailOptions {
  enabled?: boolean;
  user?: TMe | null;
}

export const useMoimDetail = (moimId: string, options: UseMoimDetailOptions = {}) => {
  return useQuery<IMoimMasterResponse>({
    queryKey: QUERY_KEYS.MOIM_DETAIL(moimId),
    queryFn: () => getDetail(moimId),
    enabled: options.enabled,
  });
};
