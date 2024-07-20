// import { configureStore } from '@reduxjs/toolkit';
// import { apiGetSearchSlice } from '../redux/api-slices/api-get-search-slice';
// import { renderHook } from '@testing-library/react-hooks';
// import { Provider } from 'react-redux';
// import fetchMock from 'jest-fetch-mock';
// import { setupListeners } from '@reduxjs/toolkit/query';

// // Mock the fetch API
// fetchMock.enableMocks();

// describe('apiGetSearchSlice', () => {
//   let store: ReturnType<typeof configureStore>;

//   beforeEach(() => {
//     store = configureStore({
//       reducer: {
//         [apiGetSearchSlice.reducerPath]: apiGetSearchSlice.reducer,
//       },
//       middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(apiGetSearchSlice.middleware),
//     });

//     setupListeners(store.dispatch);

//     fetchMock.resetMocks();
//   });

//   it('fetches data successfully', async () => {
//     const mockResponse = {
//       page: { totalPages: 1 },
//       medicalConditions: [{ id: 1, name: 'Condition 1' }],
//     };

//     fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

//     const { result, waitForNextUpdate } = renderHook(
//       () => apiGetSearchSlice.endpoints.fetchGet.useQuery({ page: 1, pageSize: 15 }),
//       {
//         wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
//       }
//     );

//     await waitForNextUpdate();

//     expect(result.current.isLoading).toBe(false);
//     expect(result.current.data).toEqual(mockResponse);
//     expect(result.current.error).toBeUndefined();

//     const params = new URLSearchParams({
//       pageNumber: '0',
//       pageSize: '15',
//     }).toString();

//     expect(fetchMock).toHaveBeenCalledWith(`${PATH_SEARCH}?${params}`);
//   });

//   it('handles non-OK response', async () => {
//     fetchMock.mockResponseOnce('Internal Server Error', { status: 500 });

//     const { result, waitForNextUpdate } = renderHook(
//       () => apiGetSearchSlice.endpoints.fetchGet.useQuery({ page: 1, pageSize: 15 }),
//       {
//         wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
//       }
//     );

//     await waitForNextUpdate();

//     expect(result.current.isLoading).toBe(false);
//     expect(result.current.error).toBeTruthy();
//     expect(result.current.error.status).toBe(500);
//   });

//   it('handles fetch errors', async () => {
//     fetchMock.mockReject(new Error('Network Error'));

//     const { result, waitForNextUpdate } = renderHook(
//       () => apiGetSearchSlice.endpoints.fetchGet.useQuery({ page: 1, pageSize: 15 }),
//       {
//         wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
//       }
//     );

//     await waitForNextUpdate();

//     expect(result.current.isLoading).toBe(false);
//     expect(result.current.error).toBeTruthy();
//     expect(result.current.error.message).toBe('Network Error');
//   });
// });
