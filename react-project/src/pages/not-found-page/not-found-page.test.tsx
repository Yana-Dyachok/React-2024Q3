import NotFoundPage from './not-found-page';
import { screen, render } from '@testing-library/react';

describe('<NotFoundPage /> test', () => {
  test('Should render correctly', () => {
    render(<NotFoundPage />);

    const mainEl = screen.getByRole('main');

    expect(mainEl).toBeInTheDocument();
  });
});
