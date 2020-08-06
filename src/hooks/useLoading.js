import { useState, useEffect } from 'react';
import { getFromApi } from "../utils/apiLayer";

const useApiGetResult = (defaultVal, endpoint, queryParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [queryState, setQueryState] = useState(queryParams);
  const [result, setResult] = useState(defaultVal);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const { data, error } = await getFromApi(endpoint, queryState);
      if (data) {
        setResult(data)
      } else {
        setApiError(error);
      }
      setIsLoading(false);
    })();
  }, [endpoint, queryState]);

  return [result, isLoading, apiError, setQueryState];
};

export default useApiGetResult;
