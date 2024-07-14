import '../setupTests';
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
      console.log('After loading:', screen.debug());
      expect(fetchMedicalConditionById).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      console.log('After fetch:', screen.debug());
      const conditionElement = screen.getByText((_, element) => {
        if (!element) return false;
        const hasText = (node: Node) => node.textContent === 'Test Condition';
        const nodeHasText = hasText(element);
        const childrenDontHaveText = Array.from(element.children).every(
          (child) => !hasText(child),
        );
        return nodeHasText && childrenDontHaveText;
      });
      expect(conditionElement).toBeInTheDocument();
    });
    const loadingIndicatorRemoved = screen.queryByRole('spiner');
    expect(loadingIndicatorRemoved).toBeNull();
  });
});
