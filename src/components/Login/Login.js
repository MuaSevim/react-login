import { useState, useEffect, useReducer, useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';
import Card from '../UI/Card';
import Button from '../UI/Button';
import styles from './Login.module.css';
import Input from '../UI/Input';

const emailReducer = (state, action) => {
  const checkEmail = email => email.includes('@');

  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: checkEmail(action.val) };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: checkEmail(state.value) };
  }

  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  const checkPassword = password => password.trim().length > 6;

  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: checkPassword(action.val) };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: checkPassword(state.value) };
  }

  return { value: '', isValid: false };
};

const Login = () => {
  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const btnRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);

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
    btnRef.current.style.background = 'seagreen';
    if (formIsValid) authCtx.onLogin(emailState.value, passwordState.value);
    else if (!emailIsValid) emailInputRef.current.activate();
    else passwordInputRef.current.activate();
  };

  return (
    <Card>
      <form onSubmit={submitHandler} className={styles.form}>
        <Input
          ref={emailInputRef}
          label="E-Mail"
          type="email"
          id="email"
          value={emailState.value}
          onChange={enteredMailHandler}
          onBlur={validateEmailHandler}
          isValid={emailState.isValid}
        />

        <Input
          ref={passwordInputRef}
          label="Password"
          type="password"
          id="password"
          value={passwordState.value}
          onChange={enteredPasswordHandler}
          onBlur={validatePasswordHandler}
          isValid={passwordState.isValid}
        />

        <div className={styles['form-actions']}>
          <Button type="submit">Login</Button>
          <p ref={btnRef}>'This is only a test'</p>
        </div>
      </form>
    </Card>
  );
};

export default Login;
