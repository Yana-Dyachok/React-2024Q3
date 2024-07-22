import { renderWithRedux } from '../utils/const/render-with-redux';
import { screen } from '@testing-library/react';
import Loading from '../components/ui/loading/loading';
import { lightTheme, darkTheme } from '../redux/toggle-theme/theme';

describe('Loading Component', () => {
  it('applies light theme correctly', () => {
    const initialState = {
      theme: {
        currentTheme: lightTheme,
      },
    };

    renderWithRedux(<Loading />, { initialState });

    const loaderDiv = screen.getByRole('loader');
    expect(loaderDiv).toHaveClass('lightTheme');
  });

  it('applies dark theme correctly', () => {
    const initialState = {
      theme: {
        currentTheme: darkTheme,
      },
    };

    renderWithRedux(<Loading />, { initialState });

    const loaderDiv = screen.getByRole('loader');
    expect(loaderDiv).toHaveClass('darkTheme');
  });
});
