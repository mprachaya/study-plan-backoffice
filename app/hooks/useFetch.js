import axios from 'axios';
import { useState, useEffect } from 'react';

export const useFetch = (url, payload) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resData, setResData] = useState([]);

  useEffect(() => {
    if (payload !== '') {
      setLoading(true);
      axios.post(url, payload).then(res => {
        setResData(() => (res.data));
      }).catch((err) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(true);
      axios.post(url).then(res => {
        setResData(() => (res.data));
      }).catch((err) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [url]);

  const refetch = (newurl, newpayload) => {
    if (newpayload !== '') {
      setLoading(true);
      axios.post(newurl, newpayload).then(res => {
        setResData(() => (res.data));
      }).catch((err) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(true);
      axios.post(newurl).then(res => {
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
