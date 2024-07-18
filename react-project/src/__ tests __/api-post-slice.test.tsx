// import { render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
// import MainContent from '../components/main-content/main-content';
// import { apiPostSearchSlice } from '../app/api-slices/api-post-slice';

// const mockedData = {
//   items: [
//     { id: 1, name: 'Item 1' },
//     { id: 2, name: 'Item 2' },
//   ],
//   isLoading: false,
//   isError: false,
// };

// jest.mock('@reduxjs/toolkit/query/react', () => ({
//   ...jest.requireActual('@reduxjs/toolkit/query/react'),
//   useFetchPostQuery: jest.fn().mockReturnValue(mockedData),
// }));

// describe('SearchResults component', () => {
//   let store: EnhancedStore;

//   beforeEach(() => {
//     store = configureStore({
//       reducer: {
//         [apiPostSearchSlice.reducerPath]: apiPostSearchSlice.reducer,
//       },
//       middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(apiPostSearchSlice.middleware),
//     });
//   });

//   it('renders search results correctly', () => {
//     render(
//       <Provider store={store}>
//         <MainContent />
//       </Provider>
//     );
//     expect(screen.getByText('Item 1')).toBeInTheDocument();
//     expect(screen.getByText('Item 2')).toBeInTheDocument();
//   });
// });
