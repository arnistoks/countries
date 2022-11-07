import axios from 'axios';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import './country.css';

const baseUrl = 'https://countries.trevorblades.com/';

const Country = ({
  countryCode, title, id, onClick,
}) => {
  const [country, setCountry] = useState();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [countryId, setCountryId] = useState();

  const getCountry = async (code) => {
    setLoader(true);
    try {
      const oneCountry = await axios({
        url: baseUrl,
        method: 'post',
        data: {
          query: `query { country (code: "${code}") { name, capital, native, phone, currency, emoji } }`,
        },
      });
      setCountry(oneCountry.data.data.country);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <button
        className={country ? "country" : "countryplus"}
        onClick={() => {
          onClick(error);
          setCountryId(id);
          getCountry(country?.name !== title ? countryCode : '');
        }}
      >
      {title}
      </button>
      { loader && countryId === id ? <Loader /> : 
        <>
          { title !== country?.name ? null : 
            <div className="container">
              <div className='flag'>{country?.emoji}</div>
              <div>Capital city: <span className='info'>{country?.capital}</span></div>
              <div>Phone code: <span className='info'>{country?.phone}</span></div>
              <div>Native name: <span className='info'>{country?.native}</span></div>
              <div>Currency: <span className='info'>{country?.currency}</span></div>
            </div>
          }
        </>
      }
    </>
  );
};

export default Country;
