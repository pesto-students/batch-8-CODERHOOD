import { useEffect, useState } from "react";
import callApi from "../libs/axios";

const useFetch = (method, url, data) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await callApi(method, url, data);
      if (result.data) {
        setResponse(result.data);
      } else {
        setError(result);
      }
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { response, error, isLoading };
};

export default useFetch;
