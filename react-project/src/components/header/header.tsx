import ErrorButton from '../../components/error-boundary/error-button';
import ToggleThemeComponent from '../toggle-theme-component/toggle-theme-component';
import styles from './header.module.css';
function Header() {
  return (
    <header className={styles.headerContainer}>
      <ErrorButton />
      <ToggleThemeComponent />
    </header>
  );
}

export default Header;
