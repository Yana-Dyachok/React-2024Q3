import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '@/lib/store';
import { Theme } from '@/types/types';

export interface ThemeState {
  currentTheme: Theme;
}

const initialState: ThemeState = {
  currentTheme: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setLightTheme: (state) => {
      state.currentTheme = 'light';
    },
    setDarkTheme: (state) => {
      state.currentTheme = 'dark';
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
