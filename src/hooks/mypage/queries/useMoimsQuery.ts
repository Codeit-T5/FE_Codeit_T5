import { useQuery } from '@tanstack/react-query';
import { getMyMoim } from '@/apis/myMoim';
import { getParticipatedMoim } from '@/apis/participatedMoim';

export const useMyMoimQuery = () => {
  return useQuery({
    queryKey: ['getMyMoim'],
    queryFn: getMyMoim,
    refetchOnMount: true,
  });
};

export const useParticipatedMoimQuery = () => {
  return useQuery({
    queryKey: ['getParticipatedMoim'],
    queryFn: getParticipatedMoim,
    refetchOnMount: true,
  });
};
