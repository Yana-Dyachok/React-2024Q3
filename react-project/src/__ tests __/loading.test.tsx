import { render } from '@testing-library/react';
import Loading from '../components/ui/loading/loading';

describe('Loading component', () => {
  it('renders loading spinner correctly', () => {
    const { container } = render(<Loading />);
    const loadingSection = container.querySelector('.rectSpinner');
    expect(loadingSection).toBeInTheDocument();
    const loadingContainer = container.querySelector('.loadingContainer');
    expect(loadingContainer).toBeInTheDocument();
    const rectElements = container.querySelectorAll('.rect');
    expect(rectElements.length).toBe(16);
    rectElements.forEach((rect, index) => {
      expect(rect).toHaveAttribute('key', `${index}-rect`);
    });
  });
});
