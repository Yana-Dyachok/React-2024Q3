import '@testing-library/jest-dom';
import Header from '../components/header/header';
import { render, screen } from '@testing-library/react';

const MockErrorButton = () => <div>ErrorButton Component</div>;
MockErrorButton.displayName = 'MockErrorButton';
jest.mock('../components/error-boundary/error-button', () => MockErrorButton);

const MockThemeSelector = () => <div>ThemeSelector Component</div>;
MockThemeSelector.displayName = 'MockThemeSelector';
jest.mock(
  '../redux/toggle-theme/theme-selector/theme-selector',
  () => MockThemeSelector,
);

describe('Header', () => {
  it('should render ErrorButton and ThemeSelector components', () => {
    render(<Header />);

    expect(screen.getByText('ErrorButton Component')).toBeInTheDocument();
    expect(screen.getByText('ThemeSelector Component')).toBeInTheDocument();
  });
});
