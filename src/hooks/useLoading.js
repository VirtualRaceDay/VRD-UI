import { useState, useEffect } from 'react';
import { getFromApi } from "../utils/apiLayer";

const useApiGetResult = (defaultVal, endpoint, queryParams) => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ queryState, setQueryState ] = useState(queryParams);
  const [ result, setResult ] = useState(defaultVal);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const { data, error } = await getFromApi(endpoint, queryState);
      if (data) {
        setResult(data)
      } else {
        console.error(error);
      }
      setIsLoading(false);
    })();
  }, [endpoint, queryState]);

  return [ result, isLoading, setQueryState];
};

export default useApiGetResult;
