// Components
import Map from '../components/Map/Map';
import Sidebar from '../components/Sidebar/Sidebar';

// CSS Module
import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
