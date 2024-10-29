import { Link } from 'react-router-dom';

// CSS Module
import styles from './CityItem.module.css';

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function CityItem({ city }) {
  const { cityName: name, emoji, date, id } = city;

  return (
    <li>
      {/* Use just id, instead of /id or will cause errors */}
      <Link className={styles.cityItem} to={`${id}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{name}</h3>
        <time className={styles.date}>
          {dateFormatter.format(new Date(date))}
        </time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
