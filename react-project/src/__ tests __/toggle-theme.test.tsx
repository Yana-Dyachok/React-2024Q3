import { render, screen, fireEvent } from '@testing-library/react';
import { useTheme } from '@/theme-context/theme-context';
import ToggleThemeComponent from '@/components/toggle-theme-component/toggle-theme-component';

jest.mock('@/theme-context/theme-context', () => ({
  useTheme: jest.fn(),
}));

describe('ToggleThemeComponent', () => {
  it('should apply active class when theme is light', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });

    render(<ToggleThemeComponent />);

    const button = screen.getByRole('button');
    const indicator = screen.getByRole('button').querySelector('div');

    expect(button).toHaveClass('toggleActive');
    expect(indicator).toHaveClass('indicatorActive');
  });

  it('should not apply active class when theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: jest.fn(),
    });

    render(<ToggleThemeComponent />);

    const button = screen.getByRole('button');
    const indicator = screen.getByRole('button').querySelector('div');

    expect(button).not.toHaveClass('toggleActive');
    expect(indicator).not.toHaveClass('indicatorActive');
  });

  it('should call toggleTheme on button click', () => {
    const toggleThemeMock = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: toggleThemeMock,
    });

    render(<ToggleThemeComponent />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
