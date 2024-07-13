import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
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
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/test-id']}>
          <Routes>
            <Route path="/:itemId" element={<DescriptionItem />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchMedicalConditionById).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Test Condition/i)).toBeInTheDocument();
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });
  });
});
