import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { renderHook, waitFor } from '@testing-library/react';
import {
  apiPostSearchSlice,
  useFetchPostQuery,
} from '../redux/api-slices/api-post-slice';
import { mockResponse } from '../utils/const/mock-response';

jest.mock('@reduxjs/toolkit/query/react', () => {
  const actual = jest.requireActual('@reduxjs/toolkit/query/react');
  return {
    ...actual,
    fetchBaseQuery: () => async () => ({
      data: mockResponse,
    }),
  };
});

describe('apiGetSearchSlice', () => {
  it('fetches and transforms data correctly', async () => {
    const store = configureStore({
      reducer: {
        [apiPostSearchSlice.reducerPath]: apiPostSearchSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiPostSearchSlice.middleware),
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(
      () => useFetchPostQuery({ searchQuery: 'acute', page: 1, pageSize: 10 }),
      { wrapper },
    );
    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.isError).toBeFalsy();
      expect(result.current.data).toEqual(mockResponse);
    });
  });
});
