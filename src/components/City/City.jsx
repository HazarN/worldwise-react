// React Libs
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';

// Contexts
import { useCityContext } from '../../contexts/CityContext';

// Components
import Spinner from '../Spinner/Spinner';
import Button from '../Button/Button';

// CSS Module
import styles from './City.module.css';
import BackButton from '../Button/BackButton';

const dateFormatter = dateStr => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(date);
};

function City() {
  const { id } = useParams();
  const { activeCity, isLoading, fetchCityById } = useCityContext();

  const { cityName, emoji, date, notes } = activeCity;

  useEffect(() => {
    fetchCityById(id);
  }, [id]);

  // Conditional render should be below the effect, due to the rules of the hooks
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{dateFormatter(date || null)}</p>
        {/* the 'null' here is extremely important */}
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target='_blank'
          rel='noreferrer'
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
