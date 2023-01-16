import { useApiCall } from '../../../hooks';
import type { NormalizedApp, Filters } from '../types';

export interface UseFetchApps {
  data: {
    apps: NormalizedApp[];
    totalCount: number;
  };
  isLoading: boolean;
  error: string;
}

const convertFiltersToQueryString = (filters: Filters) => {
  const entries = Object.entries(filters);
  const withValues = entries.filter(([key, value]) => Boolean(value));
  const toString = withValues.map((keyAndValue) => keyAndValue.join('=')).join('&');
  
  return toString;
};

interface Args {
  filters: Filters;
  count: number;
  offset: number;
}

const useFetchApps = ({ filters, count, offset }: Args): UseFetchApps => {
  const paginationQuery = `count=${count}&offset=${offset}`;
  const filtersQuery = convertFiltersToQueryString(filters);

  const queryString = filtersQuery ? 
    `${paginationQuery}&${filtersQuery}` :
    paginationQuery;

  const { data = { apps: [], totalCount: 0 },
          isLoading,
          error
        } = useApiCall({ url: '/recommended-apps', queryString });

  return { 
    data,
    isLoading,
    error,
  };
};

export default useFetchApps;