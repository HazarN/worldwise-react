// React Libs
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Contexts
import { useAuthContext } from '../contexts/FakeAuthContext';

// Components
import Navbar from '../components/Navbar/Navbar';
import Button from '../components/Button/Button';

// CSS Module
import styles from './Login.module.css';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');

  const navigate = useNavigate();
  const { _login, isAuthenticated } = useAuthContext();

  function handleSubmit(e) {
    e.preventDefault();

    _login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/app', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <Navbar />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type={'primary'}>Login</Button>
        </div>
      </form>
    </main>
  );
}
