import { Outlet } from 'react-router-dom';

// Components
import AppNav from './AppNav';
import Footer from './Footer';
import Logo from './Logo';

// CSS Module
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Sidebar;
