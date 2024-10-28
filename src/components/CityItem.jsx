// CSS Module
import styles from './CityItem.module.css';

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function CityItem({ city }) {
  const { cityName: name, emoji, date } = city;

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{name}</h3>
      <time className={styles.date}>
        {dateFormatter.format(new Date(date))}
      </time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
