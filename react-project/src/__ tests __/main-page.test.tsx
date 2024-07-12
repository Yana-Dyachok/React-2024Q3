import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MainPage from '../pages/main-page/main-page';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(<MainPage />);
  expect(true).toBeTruthy();
});
