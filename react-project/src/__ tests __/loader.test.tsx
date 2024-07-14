import { render } from '@testing-library/react';
import Loading from '../components/ui/loading/loading';

describe('Loading', () => {
  it('renders loading', () => {
    const { getByRole } = render(<Loading />);
    const loaderElement = getByRole('loader');
    expect(loaderElement).toBeInTheDocument();
  });
});
