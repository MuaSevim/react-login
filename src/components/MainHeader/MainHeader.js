import Navigation from "./Navigation";
import styles from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <header className={styles.header}>
      <h2>A Typical React Login</h2>
      {props.isAuthenticated && <Navigation onLogout={props.onLogout} />}
    </header>
  );
};

export default MainHeader;
