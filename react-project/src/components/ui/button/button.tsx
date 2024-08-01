import { useTheme } from '../../../theme-context/theme-context';
import styles from './button.module.css';
import Link from 'next/link';

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
  to = '',
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

  const { theme } = useTheme();
  const themeClass = theme === 'light' ? styles.lightTheme : styles.darkTheme;

  if (download) {
    return (
      <Link
        href={to}
        className={`${styles.button} ${themeClass}`}
        onClick={handleClick}
        download={download}
      >
        {children}
      </Link>
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
