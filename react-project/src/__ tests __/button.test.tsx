import { screen } from '@testing-library/react';
import { renderWithRedux } from '../utils/const/render-with-redux';
import Button from '../components/ui/button/button';

describe('Button component', () => {
  it('renders button with provided text', () => {
    renderWithRedux(<Button btnType="button">Click</Button>);
    const buttonElement = screen.getByText('Click');
    expect(buttonElement).toBeInTheDocument();
  });
});
