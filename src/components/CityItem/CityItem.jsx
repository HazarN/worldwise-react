// React Libs
import { Link } from 'react-router-dom';

// Contexts
import { useCityContext } from '../../contexts/CityContext';

// CSS Module
import styles from './CityItem.module.css';

const dateFormatter = (dateStr) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

function CityItem({ city }) {
  const { deleteCity } = useCityContext();
  const { cityName: name, emoji, date, id, position } = city;
  const { activeCity } = useCityContext();

  function handleClick(e) {
    e.preventDefault();
    deleteCity(city.id);
  }

  return (
    <li>
      {/* Use just id, instead of /id or will cause errors */}
      <Link
        className={`${styles.cityItem} ${
          activeCity.id === id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{name}</h3>
        <time className={styles.date}>{dateFormatter(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
