import { render, screen } from '@testing-library/react';
import Button from '../components/ui/button/button';

describe('Button component', () => {
  it('renders button with provided text', () => {
    render(<Button btnType="button">Click</Button>);
    const buttonElement = screen.getByText('Click');
    expect(buttonElement).toBeInTheDocument();
  });
});
