import { useState, useEffect } from 'react';

const useFetchCountryInfo = (code) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCountryInfo() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/nest/v1/countries/country-info/${code}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setData(data);
        return data;
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getCountryInfo();
  }, [code]);

  return [data, loading, error];
};

export default useFetchCountryInfo;
