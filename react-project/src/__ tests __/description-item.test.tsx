import { createElement } from 'react';
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
      createElement(
        MemoryRouter,
        { initialEntries: ['/test-id'] },
        createElement(
          Routes,
          null,
          createElement(Route, {
            path: '/:itemId',
            element: createElement(DescriptionItem),
          }),
        ),
      ),
    );
    const loadingIndicator = screen.getByRole('loader');
    expect(loadingIndicator).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchMedicalConditionById).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      const conditionElement = screen.queryByText(mockData.name);
      expect(conditionElement).toBeTruthy();
    });

    const loadingIndicatorRemoved = screen.queryByRole('loader');
    expect(loadingIndicatorRemoved).toBeNull();
  });
});
