import { render, screen } from '@testing-library/react';
import NotFoundPage from '../../app/routes/$catchAll';
import { useTheme } from '../theme-context/theme-context';
import { ThemeProvider } from '../theme-context/theme-provider';

jest.mock('../theme-context/theme-context', () => ({
  ...jest.requireActual('../theme-context/theme-context'),
  useTheme: jest.fn(),
}));

const renderWithTheme = (theme: 'light' | 'dark') => {
  (useTheme as jest.Mock).mockReturnValue({ theme });
  return render(
    <ThemeProvider>
      <NotFoundPage />
    </ThemeProvider>,
  );
};

describe('NotFoundPage Component', () => {
  it('applies light theme correctly', () => {
    renderWithTheme('light');

    const errorSpans = screen.getAllByText((_, element) => {
      if (!element) return false;
      return element.className.includes('spanError');
    });

    errorSpans.forEach((span) => {
      expect(span).toHaveClass('lightTheme');
    });
  });

  it('applies dark theme correctly', () => {
    renderWithTheme('dark');

    const errorSpans = screen.getAllByText((_, element) => {
      if (!element) return false;
      return element.className.includes('spanError');
    });

    errorSpans.forEach((span) => {
      expect(span).toHaveClass('darkTheme');
    });
  });
});
