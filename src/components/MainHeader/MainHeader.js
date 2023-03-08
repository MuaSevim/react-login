import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Navigation from './Navigation';
import styles from './MainHeader.module.css';

const MainHeader = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <h2>A Typical React Login</h2>
      {isLoggedIn && <Navigation />}
    </header>
  );
};

export default MainHeader;
