import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/services/user.api';
import { tokenStorage } from '@/services/token.service';
import { QUERY_KEYS } from '@/config/constants';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USER,
    queryFn: () => userApi.getCurrentUser(),
    enabled: !!tokenStorage.getAccessToken(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
