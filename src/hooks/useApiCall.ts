import { useEffect, useState, useMemo } from 'react';

interface Args {
  url: string;
  queryString?: string;
  enabled?: boolean;
}

const useApiCall = ({url, queryString, enabled = true}: Args) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fullPath = useMemo(
    () => queryString ? `${url}?${queryString}` : url,
    [url, queryString]
  );

  useEffect(() => {
    if(!enabled) {
      setData(undefined);
      setIsLoading(true);
      setError(''); 
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(fullPath);

      if(response.ok) {
        const data = await response.json();
        setData(data);        
      }
      else {
        setError(response.statusText);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [fullPath, enabled]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useApiCall;