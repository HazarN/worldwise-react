// Contexts
import { useCityContext } from '../../contexts/CityContext';

// Components
import Spinner from '../Spinner/Spinner';
import Message from '../Message/Message';
import CountryItem from '../CountryItem/CountryItem';

// CSS Module
import styles from './CountryList.module.css';

function CountryList() {
  const { cities, isLoading } = useCityContext();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message={'Add your city by clicking on a city on the map'} />
    );

  // Removing duplicate countries
  const countries = cities.reduce((arr, city) => {
    const countryNames = arr.map(el => el.country);

    if (!countryNames.includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default CountryList;
