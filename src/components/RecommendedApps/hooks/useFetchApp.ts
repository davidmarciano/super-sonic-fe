import { useApiCall } from '../../../hooks';
import type { RecommendedApp } from '../types';

interface UseFetchApp {
  data: RecommendedApp | undefined;
  isLoading: boolean;
  error: string;
}

const useFetchApp = (appId: number): UseFetchApp => {
  const enableRequest = appId > -1;

  const { data,
          isLoading,
          error
        } = useApiCall({ 
          url: `/recommended-apps/app-id/${appId}`, enabled: enableRequest
        });

  return { 
    data,
    isLoading,
    error,
  };
};

export default useFetchApp;