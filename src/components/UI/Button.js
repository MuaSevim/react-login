import styles from './Button.module.css';

const Button = props => (
  <button
    onClick={props.onClick}
    type={props.type || 'button'}
    className={`${styles.btn} ${props.className}`}
  >
    {props.children}
  </button>
);

export default Button;
