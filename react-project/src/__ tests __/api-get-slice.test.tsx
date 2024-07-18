// import { render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
// import DescriptionItem from '../pages/description-item/description-item';
// import { apiGetByIdSlice } from '../app/api-slices/api-get-slices';

// // Mocked data for useFetchMedicalConditionByIdQuery
// const mockedMedicalCondition = {
//   medicalCondition: {
//     uid: '1',
//     name: 'Test Condition',
//     description: 'Test Description',
//   },
// };

// describe('DescriptionItem', () => {
//   let store: EnhancedStore;

//   beforeEach(() => {
//     store = configureStore({
//       reducer: {
//         [apiGetByIdSlice.reducerPath]: apiGetByIdSlice.reducer,
//       },
//       middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(apiGetByIdSlice.middleware),
//     });
//   });

//   it('renders medical condition details correctly', () => {
//     // Mocking useFetchByIdQuery inside the test itself
//     jest.mock('@reduxjs/toolkit/query/react', () => ({
//       ...jest.requireActual('@reduxjs/toolkit/query/react'),
//       useFetchByIdQuery: jest.fn().mockReturnValue(mockedMedicalCondition),
//     }));

//     render(
//       <Provider store={store}>
//         <DescriptionItem />
//       </Provider>
//     );

//     // Assert that the rendered medical condition details are present
//     expect(screen.getByText('Test Condition')).toBeInTheDocument();
//     expect(screen.getByText('Test Description')).toBeInTheDocument();
//   });

//   // Add more test cases as needed
// });
