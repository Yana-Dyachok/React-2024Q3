import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { lightTheme } from '../../../redux/toggle-theme/theme';
import styles from './button.module.css';

export type ButtonProps = {
  btnType: 'button' | 'submit';
  children: string;
  to?: string;
  disabled?: boolean;
  onClick?: () => void;
  download?: string;
};

const Button = ({
  btnType = 'button',
  children,
  onClick,
  to,
  disabled,
  download,
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

  if (download) {
    return (
      <a
        href={to}
        className={`${styles.button} ${themeClass}`}
        onClick={handleClick}
        download={download}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${styles.button} ${themeClass}`}
      type={btnType}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
