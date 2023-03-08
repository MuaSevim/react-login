import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button';
import Card from '../UI/Card';
import styles from './Home.module.css';

const Home = props => {
  const authCtx = useContext(AuthContext);
  return (
    <Card className={styles.home}>
      <h1 className={styles.heading}>Welcome Back</h1>
      <Button onClick={authCtx.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
