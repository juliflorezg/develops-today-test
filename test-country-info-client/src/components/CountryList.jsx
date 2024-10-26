import React from 'react'
import { Link } from 'react-router-dom';


function CountryList({ countries, title }) {
  return (
    <div className='p-8 md:p-12 bg-green-950'>
      <div className='p-4 rounded-lg bg-green-200 md:max-w-2xl mx-auto'>

        <h2 className='text-gray-900 font-bold text-2xl mb-6' >{title}</h2>
        <ul>
          {countries && countries.map((country, i) => (
            <li key={country.countryCode + i} className=' bg-gray-800 border-b-2 border-green-900'>
              <Link to={`/country/${country.countryCode}`} className='block w-full py-2 px-2'>{country.name || country.commonName}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CountryList