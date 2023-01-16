import { useApiCall } from '../../../hooks';

interface UseFetchCategories {
  data: string[];
  isLoading: boolean;
  error: string;
}

const useFetchCategories = (): UseFetchCategories => {
  const { data = [],
          isLoading,
          error
        } = useApiCall({ url: '/recommended-apps/categories' });

  return { 
    data,
    isLoading,
    error,
  };
};

export default useFetchCategories;