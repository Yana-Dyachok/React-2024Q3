import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
const MockErrorButton = () => <div>ErrorButton Component</div>;
MockErrorButton.displayName = 'MockErrorButton';
jest.mock('../components/error-boundary/error-button', () => ({
  __esModule: true,
  default: MockErrorButton,
}));

const MockToggleTheme = () => <div>ToggleTheme Component</div>;
MockToggleTheme.displayName = 'MockToggleTheme';
jest.mock(
  '../components/toggle-theme-component/toggle-theme-component',
  () => ({
    __esModule: true,
    default: MockToggleTheme,
  }),
);

import Header from '../components/header/header';

describe('Header', () => {
  it('should render ErrorButton and ToggleTheme components', () => {
    render(<Header />);

    expect(screen.getByText('ErrorButton Component')).toBeInTheDocument();
    expect(screen.getByText('ToggleTheme Component')).toBeInTheDocument();
  });
});
