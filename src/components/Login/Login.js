import { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card';
import styles from './Login.module.css';

const Login = props => {
  const [formIsValid, setFormIsValid] = useState(false);

  const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      return { value: action.val, isValid: action.val.includes('@') };
    }

    if (action.type === 'INPUT_BLUR') {
      return { value: state.value, isValid: state.value.includes('@') };
    }

    return { value: '', isValid: false };
  };

  const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      return { value: action.val, isValid: action.val.trim().length > 6 };
    }

    if (action.type === 'INPUT_BLUR') {
      return { value: state.value, isValid: state.value.trim().length > 6 };
    }

    return { value: '', isValid: false };
  };

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const enteredMailHandler = e => {
    dispatchEmail({ type: 'USER_INPUT', val: e.target.value });
  };

  const enteredPasswordHandler = e => {
    dispatchPassword({ type: 'USER_INPUT', val: e.target.value });
  };
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    console.log('useEffect: ', emailIsValid, passwordIsValid);
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
      console.log('Timeout :', emailIsValid, passwordIsValid);
    }, 1500);

    return () => clearTimeout(identifier);
  }, [emailIsValid, passwordIsValid]);

  const validateEmailHandler = () => dispatchEmail({ type: 'INPUT_BLUR' });

  const validatePasswordHandler = () =>
    dispatchPassword({ type: 'INPUT_BLUR' });

  const submitHandler = e => {
    e.preventDefault();
    formIsValid && props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card>
      <form onSubmit={submitHandler} className={styles.form}>
        <div
          className={`${styles.control} ${
            emailState.isValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={emailState.value}
            onChange={enteredMailHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordState.isValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={passwordState.value}
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
