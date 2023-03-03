import { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card';
import styles from './Login.module.css';

const Login = props => {
  // Input states
  const [enteredMail, setEnteredMail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  // Validation States
  // Form Validation
  const [formIsValid, setFormIsValid] = useState(false);

  // Input Validation
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);

  // useReducer
  const emailReducer = () => {};
  const [emailState, dispatchEmail] = useReducer(emailReducer);

  // Storing input datas with handlers attached to inputs
  const enteredMailHandler = e => {
    setEnteredMail(e.target.value);
  };

  const enteredPasswordHandler = e => {
    setEnteredPassword(e.target.value);
  };

  // useEffect in order to check overall form validity
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        enteredMail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);

    // Cleanup return function
    return () => {
      clearTimeout(identifier);
    };
  }, [enteredMail, enteredPassword]);

  // Checking input validities after blur (unfocus)
  const validateEmailHandler = () => setEmailIsValid(enteredMail.includes('@'));

  const validatePasswordHandler = () =>
    setPasswordIsValid(enteredPassword.trim().length > 6);

  const submitHandler = e => {
    e.preventDefault();
    formIsValid && props.onLogin(enteredMail, enteredPassword);
  };

  return (
    <Card>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={`${styles.control} ${!emailIsValid && styles.invalid}`}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={enteredMail}
            onChange={enteredMailHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${!passwordIsValid && styles.invalid}`}
        >
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={enteredPassword}
            onChange={enteredPasswordHandler}
            onBlur={validatePasswordHandler}
          />
        </div>

        <div className={styles['form-actions']}>
          <button
            className={`${styles.btn} ${formIsValid && styles.active}`}
            disabled={!formIsValid}
          >
            Login
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
