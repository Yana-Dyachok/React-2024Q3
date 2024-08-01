import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../theme-context/theme-provider';
import { useTheme } from '../theme-context/theme-context';
import styles from './theme-provider.module.css';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  test('should render with default dark theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  test('should toggle theme on button click', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const button = screen.getByText('Toggle Theme');
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    fireEvent.click(button);
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    fireEvent.click(button);
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  test('should apply correct CSS class for light theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const container = screen.getByTestId('theme').parentElement?.parentElement;
    expect(container).toHaveClass(styles.container);
    expect(container).toHaveClass(styles.darkTheme);
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(container).toHaveClass(styles.lightTheme);
  });

  test('should provide the correct context value', () => {
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
