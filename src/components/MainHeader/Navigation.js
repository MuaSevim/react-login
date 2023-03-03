import styles from "./Navigation.module.css";

const Navigation = (props) => {
  return (
    <nav className={styles.nav}>
      <ul>
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
            onClick={props.onLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
