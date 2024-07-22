import '@testing-library/jest-dom';
import { renderWithRedux } from '../utils/const/render-with-redux';
import Button from '../components/ui/button/button';
import { lightTheme, darkTheme } from '../redux/toggle-theme/theme';

const renderButtonWithTheme = (theme: typeof lightTheme | typeof darkTheme) => {
  return renderWithRedux(<Button btnType="button">Test Button</Button>, {
    initialState: { theme: { currentTheme: theme } },
  });
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
    const { getByText } = renderWithRedux(
      <Button btnType="button" onClick={handleClick}>
        Click Me
      </Button>,
    );

    const button = getByText('Click Me');
    button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should handle button disabled state', () => {
    const { getByText } = renderWithRedux(
      <Button btnType="button" disabled={true}>
        Disabled Button
      </Button>,
    );

    const button = getByText('Disabled Button');
    expect(button).toBeDisabled();
  });

  it('should redirect to URL when "to" prop is provided', () => {
    const { getByText } = renderWithRedux(
      <Button btnType="button" to="http://localhost/">
        Redirect Button
      </Button>,
    );

    const button = getByText('Redirect Button');
    button.click();

    expect(window.location.href).toBe('http://localhost/');
  });
});
