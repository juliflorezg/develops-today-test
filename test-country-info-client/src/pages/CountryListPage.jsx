import React from 'react';
import useAvailableCountries from '../hooks/fetchAvailableCountries';
import CountryList from '../components/CountryList';

function CountryListPage() {
  const [countries, loadingCountries, error] = useAvailableCountries();

  console.log(countries)

  return (
    <div>
      {loadingCountries ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <CountryList countries={countries} />
      )}
    </div>
  );
}

export default CountryListPage;
