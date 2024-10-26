import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { getCountryInfo, getPopulationData, getFlagUrl } from '../services/api';
// import PopulationChart from '../components/PopulationChart';
import useFetchCountryInfo from '../hooks/fetchCountryInfo';

function CountryInfoPage() {
  const { code } = useParams();
  // const [countryInfo, setCountryInfo] = useState({});

  const [countryInfo, loadingCountryInfo, errorCountryInfo] = useFetchCountryInfo(code);

  const [populationData, setPopulationData] = useState([]);
  const [flagUrl, setFlagUrl] = useState('');

  // useEffect(() => {
  //   const fetchCountryData = async () => {
  //     const info = await getCountryInfo(code);
  //     setCountryInfo(info);
  //     const flag = await getFlagUrl(info.commonName);
  //     setFlagUrl(flag.data.flag);
  //     const population = await getPopulationData(info.commonName);
  //     setPopulationData(population.data.populationCounts);
  //   };
  //   fetchCountryData();
  // }, [code]);
  console.log({ countryInfo })

  return (
    <div className={`max mx-auto`}>

      <div>
        {loadingCountryInfo ? (
          <p>Loading country info...</p>
        ) : errorCountryInfo ? (
          <p>Error: {errorCountryInfo.message}</p>
        ) : (
          <div className='flex justify-center gap-3 max-w-96 mx-auto '>
            <h1>{countryInfo.countryName}</h1>
            <div>
              <img src={countryInfo.flagURL} alt="flag for country" />

            </div>

          </div>
        )}
      </div>


      {/* {flagUrl && <img src={flagUrl} alt={`${countryInfo.commonName} Flag`} />}
      <h2>Border Countries</h2>
      <ul>
        {countryInfo.borders?.map((borderCountry) => (
          <li key={borderCountry}>
            <Link to={`/country/${borderCountry}`}>{borderCountry}</Link>
          </li>
        ))}
      </ul>
      <h2>Population Over Time</h2>
      <PopulationChart populationData={populationData} /> */}
    </div>
  );
}

export default CountryInfoPage;
