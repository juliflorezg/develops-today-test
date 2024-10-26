import React from 'react'
import { Link } from 'react-router-dom';


function CountryList({ countries }) {
  return (
    <div>
      <h1>Country List</h1>
      <ul>
        {countries && countries.map((country, i) => (
          <li key={country.countryCode + i}>
            <Link to={`/country/${country.countryCode}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CountryList