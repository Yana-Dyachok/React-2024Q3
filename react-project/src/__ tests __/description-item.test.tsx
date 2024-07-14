import './setupTests';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
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

    render(
      <MemoryRouter initialEntries={['/test-id']}>
        <Routes>
          <Route path="/:itemId" element={<DescriptionItem />} />
        </Routes>
      </MemoryRouter>,
    );
    await waitFor(() => {
      const loadingIndicator = screen.getByRole('spiner');
      expect(loadingIndicator).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(fetchMedicalConditionById).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Test Condition/i)).toBeInTheDocument();
      const loadingIndicatorRemoved = screen.queryByRole('spiner');
      expect(loadingIndicatorRemoved).toBeNull();
    });
  });
});
