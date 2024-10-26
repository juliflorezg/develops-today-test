import React from 'react';
import useAvailableCountries from '../hooks/fetchAvailableCountries';
import CountryList from '../components/CountryList';

function CountryListPage() {
  const [countries, loadingCountries, error] = useAvailableCountries();


  return (
    <div>
      {loadingCountries ? (
        <div className="h-screen flex justify-center items-center">
          <div>
            <p className="text-2xl font-bold">Loading country list...</p>
          </div>
        </div>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <CountryList countries={countries} title="Country List" />
      )}
    </div>
  );
}

export default CountryListPage;
