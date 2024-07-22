import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '../redux/toggle-theme/theme-provider/theme-provider';
import themeSlice from '../redux/slices/theme-slice';
import ThemeContext from '../redux/toggle-theme/theme-context';
import { lightTheme, darkTheme } from '../redux/toggle-theme/theme';
const mockStore = (theme: string) =>
  configureStore({
    reducer: {
      theme: themeSlice,
    },
    preloadedState: {
      theme: { currentTheme: theme },
    },
  });

describe('ThemeProvider', () => {
  it('provides light theme correctly', () => {
    const store = mockStore(lightTheme);

    render(
      <Provider store={store}>
        <ThemeProvider>
          <ThemeContext.Consumer>
            {(contextValue) => (
              <div data-testid="theme-context-value">{contextValue}</div>
            )}
          </ThemeContext.Consumer>
        </ThemeProvider>
      </Provider>,
    );

    const contextDiv = screen.getByTestId('theme-context-value');
    expect(contextDiv.textContent).toBe(lightTheme);
  });

  it('provides dark theme correctly', () => {
    const store = mockStore(darkTheme);

    render(
      <Provider store={store}>
        <ThemeProvider>
          <ThemeContext.Consumer>
            {(contextValue) => (
              <div data-testid="theme-context-value">{contextValue}</div>
            )}
          </ThemeContext.Consumer>
        </ThemeProvider>
      </Provider>,
    );

    const contextDiv = screen.getByTestId('theme-context-value');
    expect(contextDiv.textContent).toBe(darkTheme);
  });
});
