import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { renderHook, waitFor } from '@testing-library/react';
import {
  apiGetByIdSlice,
  useFetchByIdQuery,
} from '@/app/lib/api-slices/api-get-slices';
import { mockGetByIdResponse } from '../utils/const/mock-response';

jest.mock('@reduxjs/toolkit/query/react', () => {
  const actual = jest.requireActual('@reduxjs/toolkit/query/react');
  return {
    ...actual,
    fetchBaseQuery: () => async () => ({
      data: { medicalCondition: mockGetByIdResponse },
    }),
  };
});

describe('apiGetByIdSlice', () => {
  it('fetches and transforms data correctly', async () => {
    const store = configureStore({
      reducer: {
        [apiGetByIdSlice.reducerPath]: apiGetByIdSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiGetByIdSlice.middleware),
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const uid = '2';
    const { result } = renderHook(() => useFetchByIdQuery(uid), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.isError).toBeFalsy();
      expect(result.current.data).toEqual(mockGetByIdResponse);
    });
  });
});
