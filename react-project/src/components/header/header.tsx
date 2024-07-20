import ErrorButton from '../../components/error-boundary/error-button';
import ThemeSelector from '../../redux/toggle-theme/theme-selector/theme-selector';
import styles from './header.module.css';
function Header() {
  return (
    <header className={styles.headerContainer}>
      <ErrorButton />
      <ThemeSelector />
    </header>
  );
}

export default Header;
