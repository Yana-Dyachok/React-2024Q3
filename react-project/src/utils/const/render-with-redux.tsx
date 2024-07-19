import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { lightTheme, darkTheme } from '../../toggle-theme/theme';
import themeSlice from '../../app/slices/theme-slice';
type ThemeState = {
  currentTheme: typeof lightTheme | typeof darkTheme;
};
export const renderWithRedux = (
  component: React.ReactNode,
  {
    initialState,
    store = configureStore({
      reducer: { theme: themeSlice },
      preloadedState: initialState,
    }),
  } = {} as {
    initialState?: { theme: ThemeState };
    store?: ReturnType<typeof configureStore>;
  },
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};
