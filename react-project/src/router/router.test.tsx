import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '../pages/main-page/main-page';
import DescriptionItem from '../pages/description-item/description-item';
import NotFoundPage from '../pages/not-found-page/not-found-page';
describe('Router setup tests', () => {
  test('renders MainPage for root path', () => {
    render(<MemoryRouter initialEntries={['/']}>{<MainPage />}</MemoryRouter>);
    expect(screen.getByText(/MainPage/i)).toBeInTheDocument();
  });

  test('renders DescriptionItem for /item/:itemId path', () => {
    render(
      <MemoryRouter initialEntries={['/item/123']}>
        {<DescriptionItem />}
      </MemoryRouter>,
    );
    expect(screen.getByText(/Description Item/i)).toBeInTheDocument();
  });

  test('renders NotFoundPage for unknown paths', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        {<NotFoundPage />}
      </MemoryRouter>,
    );
    expect(screen.getByText(/404 Page Not Found/i)).toBeInTheDocument();
  });
});
