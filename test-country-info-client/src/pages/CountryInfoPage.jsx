import React from 'react';
import { useParams } from 'react-router-dom';
// import { getCountryInfo, getPopulationData, getFlagUrl } from '../services/api';
// import PopulationChart from '../components/PopulationChart';
import useFetchCountryInfo from '../hooks/fetchCountryInfo';
import CountryList from '../components/CountryList';
import PopulationChart from '../components/PopulationChart';

function CountryInfoPage() {
  const { code } = useParams();

  const [countryInfo, loadingCountryInfo, errorCountryInfo] = useFetchCountryInfo(code);

  console.log({ loadingCountryInfo })

  return (
    <div className={`mx-auto min-h-screen pb-16`}>

      <div className='absolute top-3 left-3 p-4 rounded-lg bg-cyan-400'>
        <a className='no-underline text-blue-950' href="/">Go home</a>
      </div>

      <div>
        {loadingCountryInfo ? (
          <div className='h-screen flex justify-center items-center'>
            <div>
              <p className='text-2xl font-bold'>Loading country info...</p>

            </div>

          </div>
        ) : errorCountryInfo ? (
          <div className='h-screen flex justify-center items-center'>
            <div>
              <p className='text-xl font-bold'>Error: {errorCountryInfo.message}</p>

            </div>

          </div>
        ) : (
          <>
            <div className='flex flex-col md:flex-row items-center justify-center gap-3 w-full px-4 bg-teal-100 py-4 md:py-8'>
              <h1 className='text-blue-950'>{countryInfo.countryName}</h1>
              <div className='max-w-36'>
                <img src={countryInfo.flagURL} alt="flag for country" className='w-full' />
              </div>

            </div>

            <CountryList countries={countryInfo.borders} title="Country Borders" />

            <div className='p-8 md:p-12 flex items-center justify-center w-full md:w-3/4'>
              <PopulationChart populationData={countryInfo.population} />

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CountryInfoPage;
