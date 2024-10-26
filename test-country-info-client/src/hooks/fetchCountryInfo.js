import { useState, useEffect } from "react";


const useFetchCountryInfo = ({ code }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function getAvailableCountries() {
      try {
        const response = await fetch('/api/nest/v1/countries', {
          method: 'POST',
          body: JSON.stringify({
            code: code
          })
          // https://date.nager.at/api/v3/CountryInfo
        });
        console.log({ response })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log({ data })
        setData(data);
        return data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }

    }
    getAvailableCountries()
  }, [])

  return [data, loading, error]
};

export default useFetchCountryInfo