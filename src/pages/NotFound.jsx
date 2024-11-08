import Button from '../components/Button/Button';
import styles from './NotFound.module.css';
import { Link } from 'react-router-dom'; // Assuming you're using react-router

export default function NotFound() {
  return (
    <div className={styles.notfound}>
      <h1>Page Not Found 😢</h1>

      <p>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link to='/' className={styles.link}>
        <Button type={'primary'}>Go Back to Home</Button>
      </Link>
    </div>
  );
}
