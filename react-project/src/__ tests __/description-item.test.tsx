import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import DescriptionItem from '../pages/description-item/description-item';
import fetchMedicalConditionById from '../api/api-get';

jest.mock('../api/api-get');

describe('DescriptionItem component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('displays loading indicator while fetching data', async () => {
    (fetchMedicalConditionById as jest.Mock).mockResolvedValueOnce({
      name: 'Test Condition',
      psychologicalCondition: false,
    });

    render(
      <MemoryRouter initialEntries={['/test-id']}>
        <Route path="/:itemId">
          <DescriptionItem />
        </Route>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchMedicalConditionById).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Test Condition')).toBeInTheDocument();
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });
  });

  it('displays detailed card data when loaded', async () => {
    (fetchMedicalConditionById as jest.Mock).mockResolvedValueOnce({
      name: 'Test Condition',
      psychologicalCondition: false,
    });

    render(
      <MemoryRouter initialEntries={['/test-id']}>
        <Route path="/:itemId">
          <DescriptionItem />
        </Route>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Test Condition')).toBeInTheDocument();
    });
  });

  it('hides the component when close button is clicked', async () => {
    (fetchMedicalConditionById as jest.Mock).mockResolvedValueOnce({
      name: 'Test Condition',
      psychologicalCondition: false,
    });

    render(
      <MemoryRouter initialEntries={['/test-id']}>
        <Route path="/:itemId">
          <DescriptionItem />
        </Route>
      </MemoryRouter>,
    );

    await waitFor(() => {
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      expect(screen.queryByText('Test Condition')).not.toBeInTheDocument();
    });
  });
});
