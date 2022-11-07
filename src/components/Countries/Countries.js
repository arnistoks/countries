import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Country from '../Country/Country';
import './countries.css';

const baseUrl = 'https://countries.trevorblades.com/';

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getCountries = async () => {
        setLoading(true);
        try {
            const allCountries = await axios({
                url: baseUrl,
                method: 'post',
                data: {
                    query: 'query { countries { name, code } }',
                },
            });
            if (countries.length === 0) {
                setCountries(allCountries.data.data.countries);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCountries();
    }, []);

    return (
        <>
            {
                error.length > 0 ? <h1 className="error">{error}</h1> :
                    loading ? <Loader /> :
                        <>
                            {
                                countries.length > 0
                                    ? countries.map(({ name, code }, id) => (
                                        <div
                                            className='countries'
                                            key={Math.random()}>
                                            <Country countryCode={code} title={name} id={id} onClick={(el) => setError(el)} />
                                        </div>
                                    )) : null
                            }
                        </>
            }
        </>
    );
};

export default Countries;
