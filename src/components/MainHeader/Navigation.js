import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import styles from './Navigation.module.css';

const Navigation = props => {
  const { onLogout } = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="/" className={styles.link}>
            Home
          </a>
        </li>
        <li>
          <a href="/" className={styles.link}>
            Users
          </a>
        </li>
        <li>
          <a href="/" className={styles.link}>
            Admin
          </a>
        </li>
        <li>
          <button
            className={`${styles.link} ${styles.logout}`}
            onClick={onLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
