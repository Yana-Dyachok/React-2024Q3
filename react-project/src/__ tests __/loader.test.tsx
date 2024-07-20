import { renderWithRedux } from '../utils/const/render-with-redux';
import { lightTheme } from '../redux/toggle-theme/theme';
import Loading from '../components/ui/loading/loading';

describe('Loading', () => {
  it('renders loading', () => {
    const initialState = {
      theme: {
        currentTheme: lightTheme,
      },
    };

    const { getByRole } = renderWithRedux(<Loading />, { initialState });
    const loaderElement = getByRole('loader');
    expect(loaderElement).toBeInTheDocument();
  });
});
