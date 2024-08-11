import { RootState } from '@/lib/store';
import themeReducer, {
  setLightTheme,
  setDarkTheme,
  selectCurrentTheme,
} from '@/lib/slices/theme-slice';
import { configureStore } from '@reduxjs/toolkit';

describe('themeSlice', () => {
  const store = configureStore({
    reducer: {
      theme: themeReducer,
    },
  });

  it('should return the initial state', () => {
    expect(themeReducer(undefined, { type: '' })).toEqual({
      currentTheme: 'dark',
    });
  });

  it('should handle setLightTheme', () => {
    const action = setLightTheme();
    const state = themeReducer({ currentTheme: 'dark' }, action);
    expect(state.currentTheme).toBe('light');
  });

  it('should handle setDarkTheme', () => {
    const action = setDarkTheme();
    const state = themeReducer({ currentTheme: 'light' }, action);
    expect(state.currentTheme).toBe('dark');
  });

  it('should select the current theme', () => {
    store.dispatch(setLightTheme());
    const selectedTheme = selectCurrentTheme(store.getState() as RootState);

    expect(selectedTheme).toBe('light');
  });
});
