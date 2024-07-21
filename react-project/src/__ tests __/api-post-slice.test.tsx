// import { configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
// import { waitFor } from '@testing-library/react';
// import { renderHook } from '@testing-library/react';
// import { apiPostSearchSlice, useFetchPostQuery } from '../redux/api-slices/api-post-slice';
// import { PATH_SEARCH } from '../utils/const/const';

// import fetch from 'node-fetch';
// import { jest } from '@jest/globals';

// jest.mock('node-fetch', () => jest.fn());

// // Define the mock fetch
// const mockFetch = fetch as jest.Mock;

// const createTestStore = () => configureStore({
//   reducer: {
//     [apiPostSearchSlice.reducerPath]: apiPostSearchSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiPostSearchSlice.middleware),
// });

// describe('apiPostSearchSlice', () => {
//   beforeEach(() => {
//     mockFetch.mockClear();
//   });

//   it('fetches data conditions successfully', async () => {
//     const mockResponse = {
//       page: {
//         pageNumber: 0,
//         pageSize: 15,
//         numberOfElements: 1,
//         totalElements: 1,
//         totalPages: 1,
//         firstPage: true,
//         lastPage: false,
//       },
//       sort: {
//         clauses: [['name', 'asc']],
//       },
//       medicalConditions: [
//         {
//           uid: '1',
//           name: 'Condition',
//           psychologicalCondition: true,
//         },
//       ],
//     };

//     mockFetch.mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockResponse,
//     } as Response);

//     const store = createTestStore();
//     const wrapper = ({ children }: { children: React.ReactNode }) => (
//       <Provider store={store}>{children}</Provider>
//     );

//     const { result } = renderHook(
//       () => useFetchPostQuery({ searchQuery: 'Condition', pageSize: 15, page: 1 }),
//       { wrapper }
//     );

//     await waitFor(() => result.current.isSuccess);

//     expect(result.current.data).toEqual(mockResponse);
//     expect(mockFetch).toHaveBeenCalledWith(
//       `${PATH_SEARCH}?pageNumber=0&pageSize=15`,
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         body: new URLSearchParams({ name: 'Condition' }),
//       }
//     );
//   });

//   it('handles error response correctly', async () => {
//     mockFetch.mockResolvedValueOnce({
//       ok: false,
//       statusText: 'Error',
//     } as Response);

//     const store = createTestStore();
//     const wrapper = ({ children }: { children: React.ReactNode }) => (
//       <Provider store={store}>{children}</Provider>
//     );

//     const { result } = renderHook(
//       () => useFetchPostQuery({ searchQuery: 'Condition', pageSize: 15, page: 1 }),
//       { wrapper }
//     );

//     await waitFor(() => result.current.isError);

//     expect(result.current.error).toBeDefined();
//   });
// });
