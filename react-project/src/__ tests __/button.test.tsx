import '@testing-library/jest-dom';
import { renderWithRedux } from '../utils/const/render-with-redux';
import Button from '../components/ui/button/button';
import { lightTheme, darkTheme } from '../redux/toggle-theme/theme';
import { ButtonProps } from '../components/ui/button/button';
const renderButtonWithTheme = (
  theme: typeof lightTheme | typeof darkTheme,
  props: Partial<ButtonProps> = {},
) => {
  return renderWithRedux(
    <Button btnType="button" {...props}>
      Test Button
    </Button>,
    {
      initialState: { theme: { currentTheme: theme } },
    },
  );
};

describe('Button', () => {
  it('should render with light theme', () => {
    const { getByText } = renderButtonWithTheme(lightTheme);
    const button = getByText('Test Button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('lightTheme');
  });

  it('should render with dark theme', () => {
    const { getByText } = renderButtonWithTheme(darkTheme);
    const button = getByText('Test Button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('darkTheme');
  });

  it('should handle button click', () => {
    const handleClick = jest.fn();
    const { getByText } = renderButtonWithTheme(lightTheme, {
      onClick: handleClick,
    });

    const button = getByText('Test Button');
    button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should handle button disabled state', () => {
    const { getByText } = renderButtonWithTheme(lightTheme, { disabled: true });

    const button = getByText('Test Button');
    expect(button).toBeDisabled();
  });

  it('should render as an anchor element with download attribute when "download" and "to" props are provided', () => {
    const { getByText } = renderButtonWithTheme(lightTheme, {
      download: 'file.txt',
      to: 'http://localhost/',
    });

    const button = getByText('Test Button');
    expect(button).toHaveAttribute('href', 'http://localhost/');
    expect(button).toHaveAttribute('download', 'file.txt');
    expect(button.tagName).toBe('A');
  });

  it('should render as a button element when only "btnType" prop is provided', () => {
    const { getByText } = renderButtonWithTheme(lightTheme, {
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

    const { getByText } = renderButtonWithTheme(lightTheme, {
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
