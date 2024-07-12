import { render, fireEvent } from '@testing-library/react';
import ErrorButton from '../components/error-boundary/error-button';

describe('ErrorButton', () => {
  it('throws error on button click', () => {
    const { getByText } = render(<ErrorButton />);
    const button = getByText('Error');
    fireEvent.click(button);
    expect(() => {
      fireEvent.click(button);
    }).toThrow('You are getting an error');
  });
});
