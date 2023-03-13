import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import styles from './Input.module.css';

const Input = forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return { activate };
  });

  return (
    <div
      className={`${styles.control} ${
        props.isValid === false ? styles.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;

// Note:
// You can only focus on one element at a time
