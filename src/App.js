import React, { useContext } from 'react';
import AuthContext from './store/auth-context';
import MainHeader from './components/MainHeader/MainHeader';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
};

export default App;
