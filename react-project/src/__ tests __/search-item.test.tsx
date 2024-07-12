import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchItem from '../components/search-item/search-item';

describe('SearchItem component', () => {
  it('should render condition name correctly', () => {
    const condition = {
      uid: '123',
      name: 'Test Condition',
      psychologicalCondition: false,
    };

    const { getByText } = render(
      <MemoryRouter>
        <SearchItem condition={condition} />
      </MemoryRouter>,
    );

    const conditionNameElement = getByText('Test Condition');
    expect(conditionNameElement).toBeInTheDocument();
  });

  it('should render condition with correct URL', () => {
    const condition = {
      uid: '456',
      name: 'Another Condition',
      psychologicalCondition: true,
    };

    const { getByText } = render(
      <MemoryRouter>
        <SearchItem condition={condition} />
      </MemoryRouter>,
    );

    const conditionLinkElement = getByText('Another Condition');
    expect(conditionLinkElement).toHaveAttribute('href', '/item/456');
  });
});
