import { RootState } from '../../../app/store/store';
import { lightTheme } from '../../../toggle-theme/theme';
import { useSelector } from 'react-redux';
import styles from './button.module.css';
type ButtonProps = {
  btnType: 'button' | 'submit';
  children: string;
  to?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  btnType = 'button',
  children,
  onClick,
  to,
  disabled,
}: ButtonProps) => {
  const handleClick = () => {
    if (to) {
      window.location.href = to;
    }
    if (onClick) {
      onClick();
    }
  };
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
  const themeClass =
    currentTheme === lightTheme ? styles.lightTheme : styles.darkTheme;
  return (
    <button
      className={`${styles.button} ${themeClass}`}
      type={btnType === 'button' ? 'button' : 'submit'}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
