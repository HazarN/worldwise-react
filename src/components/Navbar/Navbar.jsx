// React Libs
import { NavLink } from 'react-router-dom';

// Components
import Logo from '../Logo/Logo';

// CSS Module
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to={'/pricing'}>Pricing</NavLink>
        </li>

        <li>
          <NavLink to={'/product'}>Product</NavLink>
        </li>

        <li>
          <NavLink to={'/login'} className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
