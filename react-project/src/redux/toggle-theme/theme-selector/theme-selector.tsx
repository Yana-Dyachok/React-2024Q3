import React from 'react';
import { setDarkTheme, setLightTheme } from '../../slices/theme-slice';
import { useDispatch, useSelector } from 'react-redux';
import { lightTheme } from '../theme';
import { selectCurrentTheme } from '../../slices/theme-slice';
import styles from './toggle-theme-indicator.module.css';

const ThemeSelector: React.FC = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectCurrentTheme);

  const handleClick = () => {
    if (currentTheme === lightTheme) {
      dispatch(setDarkTheme());
    } else {
      dispatch(setLightTheme());
    }
  };

  return (
    <button
      className={`${styles.toggle} ${
        currentTheme === lightTheme ? styles.toggleActive : ''
      }`}
      onClick={handleClick}
    >
      <div
        className={`${styles.indicator} ${
          currentTheme === lightTheme ? styles.indicatorActive : ''
        }`}
      ></div>
    </button>
  );
};

export default ThemeSelector;
