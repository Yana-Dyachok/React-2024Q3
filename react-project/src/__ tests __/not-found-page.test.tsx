import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import NotFoundPage from '../pages/not-found-page/not-found-page';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the not found page', () => {
  render(<NotFoundPage />);
  expect(true).toBeTruthy();
});
