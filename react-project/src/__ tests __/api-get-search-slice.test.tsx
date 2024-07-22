import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { renderHook, waitFor } from '@testing-library/react';
import {
  apiGetSearchSlice,
  useFetchGetQuery,
} from '../redux/api-slices/api-get-search-slice';
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
        [apiGetSearchSlice.reducerPath]: apiGetSearchSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiGetSearchSlice.middleware),
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(
      () => useFetchGetQuery({ page: 1, pageSize: 10 }),
      { wrapper },
    );
    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.isError).toBeFalsy();
      expect(result.current.data).toEqual(mockResponse);
    });
  });
});
