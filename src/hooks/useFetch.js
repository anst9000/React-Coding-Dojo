import { useEffect, useState } from 'react';

const useFetch = url => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortController.signal })
        .then(res => {
          if (!res.ok)
            throw Error('--> Could not fetch the data for that resource');

          return res.json();
        })
        .then(receivedData => {
          setData(receivedData);
          setIsPending(false);
          setError(null);
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1500);

    return () => abortController.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
