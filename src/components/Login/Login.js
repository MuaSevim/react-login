import { useState, useEffect, useReducer, useContext } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import styles from './Login.module.css';
import AuthContext from '../../store/auth-context';

const Login = props => {
  const authCtx = useContext(AuthContext);

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
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => clearTimeout(identifier);
  }, [emailIsValid, passwordIsValid]);

  const validateEmailHandler = () => dispatchEmail({ type: 'INPUT_BLUR' });

  const validatePasswordHandler = () =>
    dispatchPassword({ type: 'INPUT_BLUR' });

  const submitHandler = e => {
    e.preventDefault();
    formIsValid && authCtx.onLogin(emailState.value, passwordState.value);
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
          <Button
            className={`${!formIsValid && styles.inactive}`}
            disabled={!formIsValid}
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
