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

      <p>List of the cities will be there</p>

      <Footer />
    </div>
  );
}

export default Sidebar;
