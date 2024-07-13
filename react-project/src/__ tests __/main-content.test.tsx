import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainContent from '../components/main-content/main-content';

test('Renders the main page', () => {
  render(
    <MemoryRouter>
      <MainContent />
    </MemoryRouter>,
  );
  expect(true).toBeTruthy();
});
