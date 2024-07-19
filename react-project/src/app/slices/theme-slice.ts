import { createSlice } from '@reduxjs/toolkit';
import { lightTheme, darkTheme } from '../../toggle-theme/theme';

const initialState = {
  currentTheme: darkTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setLightTheme: (state) => {
      state.currentTheme = lightTheme;
    },
    setDarkTheme: (state) => {
      state.currentTheme = darkTheme;
    },
  },
});

export const { setLightTheme, setDarkTheme } = themeSlice.actions;

export default themeSlice.reducer;
