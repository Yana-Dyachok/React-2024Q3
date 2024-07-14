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
    const mockData = {
      name: 'Test Condition',
      psychologicalCondition: false,
    };
    (fetchMedicalConditionById as jest.Mock).mockResolvedValueOnce(mockData);

    render(
      <MemoryRouter initialEntries={['/test-id']}>
        <Routes>
          <Route path="/:itemId" element={<DescriptionItem />} />
        </Routes>
      </MemoryRouter>,
    );

    const loadingIndicator = screen.getByRole('loader');
    expect(loadingIndicator).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchMedicalConditionById).toHaveBeenCalledTimes(1);
    });

    screen.debug();

    await waitFor(() => {
      const conditionElement = screen.queryByText((_, element) => {
        const hasText = (node: HTMLElement) =>
          node.textContent === mockData.name;
        const elementHasText = hasText(element as HTMLElement);
        const childrenDontHaveText = Array.from(element?.children || []).every(
          (child) => !hasText(child as HTMLElement),
        );
        return elementHasText && childrenDontHaveText;
      });

      console.log('Condition element:', conditionElement);

      expect(conditionElement).toBeInTheDocument();
    });

    const loadingIndicatorRemoved = screen.queryByRole('loader');
    expect(loadingIndicatorRemoved).toBeNull();
  });
});
