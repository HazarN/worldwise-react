// CSS Module
import styles from './CountryList.module.css';

// Components
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';

function CountryList({ cities, isLoading }) {
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
