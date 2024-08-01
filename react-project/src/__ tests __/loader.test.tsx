import { screen, render } from '@testing-library/react';
import Loading from '../components/ui/loading/loading';
import { useTheme } from '../theme-context/theme-context';

jest.mock('../theme-context/theme-context', () => ({
  useTheme: jest.fn(),
}));

describe('Loading Component', () => {
  it('applies light theme correctly', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

    render(<Loading />);

    const loaderDiv = screen.getByRole('loader');
    expect(loaderDiv).toHaveClass('lightTheme');
  });

  it('applies dark theme correctly', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark' });

    render(<Loading />);

    const loaderDiv = screen.getByRole('loader');
    expect(loaderDiv).toHaveClass('darkTheme');
  });
});
