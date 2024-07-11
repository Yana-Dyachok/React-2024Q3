import MainPage from './main-page';
import { screen, render } from '@testing-library/react';

describe('<MainPage /> test', () => {
  test('Should render correctly', () => {
    render(<MainPage />);

    const mainEl = screen.getByRole('main');

    expect(mainEl).toBeInTheDocument();
  });
});
