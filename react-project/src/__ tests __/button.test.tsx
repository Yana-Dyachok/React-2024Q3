// import { render, fireEvent } from '@testing-library/react';
// import Button from '../components/ui/button/button';

// describe('Button component', () => {
//   it('should render button with correct text', () => {
//     const { getByText } = render(<Button btnType="button">Click me</Button>);
//     expect(getByText('Click me')).toBeInTheDocument();
//   });

//   it('should render with correct button type', () => {
//     const { getByText } = render(<Button btnType="button">Click me</Button>);
//     const button = getByText('Click me');
//     expect(button.tagName).toBe('BUTTON');
//     expect(button).toHaveAttribute('type', 'button');
//   });

//   it('should render with submit button type when specified', () => {
//     const { getByText } = render(<Button btnType="submit">Submit</Button>);
//     const button = getByText('Submit');
//     expect(button).toHaveAttribute('type', 'submit');
//   });

//   it('should have disabled attribute when disabled is true', () => {
//     const { getByText } = render(
//       <Button btnType="button" disabled>
//         Disabled Button
//       </Button>,
//     );
//     const button = getByText('Disabled Button');
//     expect(button).toBeDisabled();
//   });

//   it('should call onClick handler when clicked', () => {
//     const handleClick = jest.fn();
//     const { getByText } = render(
//       <Button btnType="button" onClick={handleClick}>
//         Click me
//       </Button>,
//     );
//     const button = getByText('Click me');
//     fireEvent.click(button);
//     expect(handleClick).toHaveBeenCalledTimes(1);
//   });

//   it('should navigate to specified URL when to prop is provided', () => {
//     const { getByText } = render(
//       <Button btnType="button" to="/path">
//         Go to Path
//       </Button>,
//     );
//     const button = getByText('Go to Path');
//     fireEvent.click(button);
//     expect(window.location.href).toBe('http://localhost/path');
//   });
// });
