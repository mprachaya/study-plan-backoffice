import axios from 'axios';
import { useState, useEffect } from 'react';

export const useFetch = (url, payload) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resData, setResData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (payload !== '') {
        setLoading(true);
        await axios.post(url, payload).then(res => {
          setResData(() => (res.data));
        }).catch((err) => {
          setError(err);
        }).finally(() => {
          setLoading(false);
        });
      } else {
        setLoading(true);
        await axios.post(url).then(res => {
          setResData(() => (res.data));
        }).catch((err) => {
          setError(err);
        }).finally(() => {
          setLoading(false);
        });
      }
    };
    fetchData();
  }, [url]);

  const refetch = async (newurl, newpayload) => {
    if (newpayload !== '') {
      setLoading(true);
      await axios.post(newurl, newpayload).then(res => {
        setResData(() => (res.data));
      }).catch((err) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(true);
      await axios.post(newurl).then(res => {
        setResData(() => (res.data));
      }).catch((err) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
    }
  };
  return {
    resData, setResData, loading, error, refetch
  };
};

export default useFetch;
