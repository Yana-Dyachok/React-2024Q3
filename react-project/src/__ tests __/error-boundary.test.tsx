import { render, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../components/error-boundary/error-boundary';
console.error = jest.fn();

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Child component</div>
      </ErrorBoundary>,
    );
    expect(getByText('Child component')).toBeInTheDocument();
  });

  it('renders fallback UI when an error is thrown', () => {
    const ErrorComponent = () => {
      throw new Error('Test error');
    };
    const { getByText } = render(
      <ErrorBoundary fallback={<div>Fallback UI</div>}>
        <ErrorComponent />
      </ErrorBoundary>,
    );
    expect(getByText('Fallback UI')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      expect.any(Error),
      expect.any(Object),
    );
  });

  it('handles error and allows navigation back', () => {
    const ErrorComponent = () => {
      throw new Error('Test error');
    };
    const mockNavigate = jest.fn();
    const { getByText } = render(
      <ErrorBoundary fallback={<div>Fallback UI</div>}>
        <ErrorComponent />
      </ErrorBoundary>,
    );
    fireEvent.click(getByText('Back'));
    expect(mockNavigate).toHaveBeenCalled();
  });
});
