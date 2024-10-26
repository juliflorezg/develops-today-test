import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryInfo, getPopulationData, getFlagUrl } from '../services/api';
import PopulationChart from '../components/PopulationChart';
import useFetchCountryInfo from '../hooks/fetchCountryInfo';

function CountryInfoPage() {
  const { code } = useParams();
  // const [countryInfo, setCountryInfo] = useState({});

  const [countryInfo, loadingCountryInfo, errorCountruInfo] = useFetchCountryInfo();

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

  return (
    <div>

      <div>
        {loadingCountryInfo ? (
          <p>Loading country info...</p>
        ) : errorCountruInfo ? (
          <p>Error: {errorCountruInfo.message}</p>
        ) : (
          <h1>{countryInfo.commonName}</h1>
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
