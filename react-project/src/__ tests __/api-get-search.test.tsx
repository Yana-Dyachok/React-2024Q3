// import { render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
// import MainContent from '../components/main-content/main-content';
// import { apiGetSearchSlice } from '../app/api-slices/api-get-search-slice';
// import { ApiResponse } from '../types/api-interface';
// // Define mockedData at the top of the file
// const mockedApiResponse = {
//   items: [
//     { uid: 1, name: 'Item 1' },
//     { uid: 2, name: 'Item 2' },
//   ],
//   isLoading: false,
//   isError: false,
// };

// // Mock fetchBaseQuery to simulate API call
// const mockFetchBaseQuery = jest.fn().mockImplementation(() => ({
//   fetchGet: async ({ page, pageSize }: { page: number; pageSize: number }) => {
//     const params = new URLSearchParams({
//       pageNumber: (page - 1).toString(),
//       pageSize: pageSize.toString(),
//     }).toString();
//     const response = await fetch(`/api/search?${params}`);
//     return await response.json();
//   },
// }));

// // Jest mock setup should be outside describe block
// jest.mock('@reduxjs/toolkit/query/react', () => ({
//   ...jest.requireActual('@reduxjs/toolkit/query/react'),
//   createApi: jest.fn(() => ({
//     reducerPath: 'api',
//     endpoints: (builder: any) => ({
//       fetchGet: builder.query({
//         queryFn: mockFetchBaseQuery().fetchGet, // Use the mocked fetchGet function
//         transformResponse: (response:  ApiResponse) => response,
//       }),
//     }),
//   })),
//   fetchBaseQuery: mockFetchBaseQuery, // Mock fetchBaseQuery as well
// }));

// describe('SearchResults component', () => {
//   let store: EnhancedStore;

//   beforeEach(() => {
//     store = configureStore({
//       reducer: {
//         [apiGetSearchSlice.reducerPath]: apiGetSearchSlice.reducer,
//       },
//       middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(apiGetSearchSlice.middleware),
//     });
//   });

//   it('renders search results correctly', async () => {
//     // Mock the API call result
//     mockFetchBaseQuery().fetchGet.mockResolvedValue(mockedApiResponse);

//     render(
//       <Provider store={store}>
//         <MainContent />
//       </Provider>
//     );

//     // Wait for data to be rendered
//     await screen.findByText('Item 1');
//     await screen.findByText('Item 2');

//     // Assert that the rendered items are present
//     expect(screen.getByText('Item 1')).toBeInTheDocument();
//     expect(screen.getByText('Item 2')).toBeInTheDocument();
//   });
// });
