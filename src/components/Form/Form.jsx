// React Libs
import { useState } from 'react';
import DatePicker from 'react-datepicker';

// Contexts
import { useCityContext } from '../../contexts/CityContext';

// Custom Hooks
import { useURLPosition } from '../../hooks/useURLPosition';
import { useDecodeGeolocation } from '../../hooks/useDecodeGeolocation';

// Components
import BackButton from '../Button/BackButton';
import Button from '../Button/Button';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';

// CSS
import styles from './Form.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

function Form() {
  const navigate = useNavigate();
  const { createCity, isLoading } = useCityContext();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [emoji, setEmoji] = useState('');
  const [notes, setNotes] = useState('');
  const [lat, lng] = useURLPosition();
  const [date, setDate] = useState(new Date());
  const [isLoadingDecoding, setIsLoadingDecoding] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    await createCity({
      cityName,
      country,
      emoji,
      notes,
      position: {
        lat,
        lng,
      },
      date,
      // id will be covered by json-server
    });
    navigate('/app/cities');
  }

  useDecodeGeolocation(
    [lat, lng],
    setCityName,
    setCountry,
    setIsLoadingDecoding,
    setEmoji
  );

  if (isLoadingDecoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message={'Start by clicking somewhere on the map '} />;

  if (!country)
    return <Message message={'No available country around here, sorry'} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <DatePicker
          calendarClassName={styles['react-datepicker']}
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={'dd/MM/yyyy'}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={'primary'}>Add</Button>
        <BackButton>&larr; Back</BackButton>
      </div>
    </form>
  );
}

export default Form;
