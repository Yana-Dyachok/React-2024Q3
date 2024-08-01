import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../theme-context/theme-provider';
import { useTheme } from '../theme-context/theme-context';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

const ComponentThatUsesThemeOutsideProvider = () => {
  useTheme();
  return <div>No Error</div>;
};

describe('ThemeContext and useTheme', () => {
  test('should throw error when useTheme is used outside of ThemeProvider', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<ComponentThatUsesThemeOutsideProvider />)).toThrow(
      'error of useTheme',
    );

    consoleError.mockRestore();
  });

  test('should return correct context value when used within ThemeProvider', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });
});
