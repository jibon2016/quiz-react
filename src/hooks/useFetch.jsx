import { useEffect, useState } from "react";



export default function useFatch(url, method, headers){
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);
  

  useEffect(() => {
    async function requestfetch(){
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(url, {
          method: method || "GET",
          headers: headers
        });
        const data = await response.json();
        setLoading(false);
        setResult(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
    requestfetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loading,
    error,
    result
  }
}