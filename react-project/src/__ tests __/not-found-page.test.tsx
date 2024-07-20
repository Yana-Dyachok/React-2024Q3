import '@testing-library/jest-dom';
import { lightTheme } from '../redux/toggle-theme/theme';
import { renderWithRedux } from '../utils/const/render-with-redux';
import NotFoundPage from '../pages/not-found-page/not-found-page';

test('demo', () => {
  expect(true).toBe(true);
});

describe('NotFoundPage', () => {
  it('renders NotFoundPage', () => {
    const initialState = {
      theme: {
        currentTheme: lightTheme,
      },
    };

    const { getByText } = renderWithRedux(<NotFoundPage />, { initialState });
    expect(getByText('Ooops... Page not found')).toBeInTheDocument();
    expect(getByText('Back to main')).toBeInTheDocument();
  });
});
