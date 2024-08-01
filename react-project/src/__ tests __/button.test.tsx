import '@testing-library/jest-dom';
import { ThemeProvider } from '../theme-context/theme-provider';
import Button from '../components/ui/button/button';
import { ButtonProps } from '../components/ui/button/button';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTheme } from '../theme-context/theme-context';
jest.mock('../theme-context/theme-context', () => ({
  ...jest.requireActual('../theme-context/theme-context'),
  useTheme: jest.fn(),
}));

const renderButtonWithTheme = (
  theme: 'light' | 'dark',
  props: Partial<ButtonProps> = {},
) => {
  (useTheme as jest.Mock).mockReturnValue({ theme });
  return render(
    <ThemeProvider>
      <Button btnType="button" {...props}>
        Test Button
      </Button>
    </ThemeProvider>,
  );
};

describe('Button', () => {
  it('should render with light theme', () => {
    const { getByText } = renderButtonWithTheme('light');
    const button = getByText('Test Button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('lightTheme');
  });

  it('should render with dark theme', () => {
    const { getByText } = renderButtonWithTheme('dark');
    const button = getByText('Test Button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('darkTheme');
  });

  it('should handle button click', () => {
    const handleClick = jest.fn();
    const { getByText } = renderButtonWithTheme('light', {
      onClick: handleClick,
    });

    const button = getByText('Test Button');
    button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should handle button disabled state', () => {
    const { getByText } = renderButtonWithTheme('light', { disabled: true });

    const button = getByText('Test Button');
    expect(button).toBeDisabled();
  });

  it('should render as an anchor element with download attribute when "download" and "to" props are provided', () => {
    const { getByText } = renderButtonWithTheme('light', {
      download: 'file.txt',
      to: 'http://localhost/',
    });

    const button = getByText('Test Button');
    expect(button).toHaveAttribute('href', 'http://localhost/');
    expect(button).toHaveAttribute('download', 'file.txt');
    expect(button.tagName).toBe('A');
  });

  it('should render as a button element when only "btnType" prop is provided', () => {
    const { getByText } = renderButtonWithTheme('light', {
      btnType: 'submit',
    });

    const button = getByText('Test Button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button.tagName).toBe('BUTTON');
  });

  it('should redirect to URL when "to" prop is provided', () => {
    const originalLocation = window.location;
    const mockLocation = { href: '' };
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    const { getByText } = renderButtonWithTheme('light', {
      to: 'http://localhost/',
    });

    const button = getByText('Test Button');
    button.click();

    expect(mockLocation.href).toBe('http://localhost/');
    Object.defineProperty(window, 'location', {
      value: originalLocation,
    });
  });
});
