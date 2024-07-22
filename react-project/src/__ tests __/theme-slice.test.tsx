import { configureStore } from '@reduxjs/toolkit';
import themeReducer, {
  setLightTheme,
  setDarkTheme,
} from '../redux/slices/theme-slice';
import { lightTheme, darkTheme } from '../redux/toggle-theme/theme';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../utils/local-storage/ls-handler';
import { RootState } from '../redux/store/store';

jest.mock('../utils/local-storage/ls-handler', () => ({
  getFromLocalStorage: jest.fn(),
  saveToLocalStorage: jest.fn(),
}));

describe('themeSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        theme: themeReducer,
      },
    });
  });

  it('should handle setLightTheme', () => {
    (getFromLocalStorage as jest.Mock).mockReturnValueOnce(
      JSON.stringify(darkTheme),
    );

    store.dispatch(setLightTheme());
    const state = store.getState() as RootState;

    expect(state.theme.currentTheme).toEqual(lightTheme);
    expect(saveToLocalStorage).toHaveBeenCalledWith(
      'theme',
      JSON.stringify(lightTheme),
    );
  });

  it('should handle setDarkTheme', () => {
    (getFromLocalStorage as jest.Mock).mockReturnValueOnce(
      JSON.stringify(lightTheme),
    );

    store.dispatch(setDarkTheme());
    const state = store.getState() as RootState;

    expect(state.theme.currentTheme).toEqual(darkTheme);
    expect(saveToLocalStorage).toHaveBeenCalledWith(
      'theme',
      JSON.stringify(darkTheme),
    );
  });
});
