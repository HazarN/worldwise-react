// Components
import Spinner from '../Spinner/Spinner';
import Message from '../Message/Message';

// CSS Module
import styles from './CityList.module.css';
import CityItem from '../CityItem/CityItem';

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message={'Add your city by clicking on a city on the map'} />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map(city => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;