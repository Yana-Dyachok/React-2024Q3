import { createSlice } from '@reduxjs/toolkit';
import { lightTheme, darkTheme } from '../toggle-theme/theme';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/local-storage/ls-handler';
import { createSelector } from 'reselect';
import { RootState } from '../store/store';

const getThemeFromLocalStorage = (key: string): string => {
  const theme = getFromLocalStorage(key);
  return theme ? JSON.parse(theme) : lightTheme;
};

const initialState = {
  currentTheme: getThemeFromLocalStorage('theme'),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setLightTheme: (state) => {
      state.currentTheme = lightTheme;
      saveToLocalStorage('theme', JSON.stringify(lightTheme));
    },
    setDarkTheme: (state) => {
      state.currentTheme = darkTheme;
      saveToLocalStorage('theme', JSON.stringify(darkTheme));
    },
  },
});

export const { setLightTheme, setDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;

const selectThemeState = (state: RootState) => state.theme;

export const selectCurrentTheme = createSelector(
  [selectThemeState],
  (themeState) => themeState.currentTheme,
);
