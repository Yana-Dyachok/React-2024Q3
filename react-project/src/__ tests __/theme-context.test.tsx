import React from 'react';
import { render } from '@testing-library/react';
import ThemeContext from '../redux/toggle-theme/theme-context';
import { lightTheme, darkTheme } from '../redux/toggle-theme/theme';

describe('ThemeContext', () => {
  it('should be initialized with the default value lightTheme', () => {
    const TestComponent = () => {
      const theme = React.useContext(ThemeContext);
      return <div>{theme === lightTheme ? 'lightTheme' : 'darkTheme'}</div>;
    };

    const { getByText } = render(
      <ThemeContext.Provider value={lightTheme}>
        <TestComponent />
      </ThemeContext.Provider>,
    );

    expect(getByText('lightTheme')).toBeInTheDocument();
  });

  it('should provide darkTheme when set as value', () => {
    const TestComponent = () => {
      const theme = React.useContext(ThemeContext);
      return <div>{theme === darkTheme ? 'darkTheme' : 'lightTheme'}</div>;
    };

    const { getByText } = render(
      <ThemeContext.Provider value={darkTheme}>
        <TestComponent />
      </ThemeContext.Provider>,
    );

    expect(getByText('darkTheme')).toBeInTheDocument();
  });
});
