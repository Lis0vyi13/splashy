import { useQuery } from '@tanstack/react-query';

import { fetchMe } from '../api';
import { QUERY_KEYS } from './queryKeys';
import type { User } from './types';

export const useMeQuery = () => {
  return useQuery<User>({
    queryKey: QUERY_KEYS.me,
    queryFn: fetchMe,
  });
};
