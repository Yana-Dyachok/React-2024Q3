import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '../pages/main-page/main-page';

test('Renders the main page', () => {
  render(
    <MemoryRouter>
      <MainPage />
    </MemoryRouter>,
  );
  expect(true).toBeTruthy();
});
