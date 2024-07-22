import { renderWithRedux } from '../utils/const/render-with-redux';
import { screen } from '@testing-library/react';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import { lightTheme, darkTheme } from '../redux/toggle-theme/theme';

describe('NotFoundPage Component', () => {
  it('applies light theme correctly', () => {
    const initialState = {
      theme: {
        currentTheme: lightTheme,
      },
    };

    renderWithRedux(<NotFoundPage />, { initialState });

    const errorSpans = screen.getAllByText((_, element) => {
      if (!element) return false;
      return element.className.includes('spanError');
    });

    errorSpans.forEach((span) => {
      expect(span).toHaveClass('lightTheme');
    });
  });

  it('applies dark theme correctly', () => {
    const initialState = {
      theme: {
        currentTheme: darkTheme,
      },
    };

    renderWithRedux(<NotFoundPage />, { initialState });

    const errorSpans = screen.getAllByText((_, element) => {
      if (!element) return false;
      return element.className.includes('spanError');
    });

    errorSpans.forEach((span) => {
      expect(span).toHaveClass('darkTheme');
    });
  });
});
