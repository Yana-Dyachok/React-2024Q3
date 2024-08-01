// import '@testing-library/jest-dom';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { lightTheme, darkTheme } from '../redux/toggle-theme/theme';
// import searchSlice from '../redux/slices/search-slice';
// import themeSlice from '../redux/slices/theme-slice';
// import SearchInput from '../components/search-input/search-input';
// const renderWithRedux = (
//   component: React.ReactNode,
//   {
//     initialState,
//     store = configureStore({
//       reducer: {
//         search: searchSlice,
//         theme: themeSlice,
//       },
//       preloadedState: initialState,
//     }),
//   } = {} as {
//     initialState?: {
//       search: { searchInput: string };
//       theme: { currentTheme: typeof lightTheme | typeof darkTheme };
//     };
//     store?: ReturnType<typeof configureStore>;
//   },
// ) => {
//   return {
//     ...render(<Provider store={store}>{component}</Provider>),
//     store,
//   };
// };

// describe('SearchInput', () => {
//   it('should update search query and dispatch action on input change', () => {
//     const mockOnSearchChange = jest.fn();
//     const initialState = {
//       search: { searchInput: '' },
//       theme: { currentTheme: lightTheme },
//     };

//     renderWithRedux(<SearchInput onSearchChange={mockOnSearchChange} />, {
//       initialState,
//     });

//     const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
//     fireEvent.change(input, { target: { value: 'test query' } });

//     expect(input.value).toBe('test query');
//     expect(mockOnSearchChange).not.toHaveBeenCalled();
//   });

//   it('should call onSearchChange with trimmed query on button click', () => {
//     const mockOnSearchChange = jest.fn();
//     const initialState = {
//       search: { searchInput: 'test query' },
//       theme: { currentTheme: lightTheme },
//     };

//     renderWithRedux(<SearchInput onSearchChange={mockOnSearchChange} />, {
//       initialState,
//     });

//     const button = screen.getByRole('button');
//     fireEvent.click(button);

//     expect(mockOnSearchChange).toHaveBeenCalledWith('test query');
//   });

//   it('should call onSearchChange with trimmed query on Enter key press', () => {
//     const mockOnSearchChange = jest.fn();
//     const initialState = {
//       search: { searchInput: 'test query' },
//       theme: { currentTheme: lightTheme },
//     };

//     renderWithRedux(<SearchInput onSearchChange={mockOnSearchChange} />, {
//       initialState,
//     });

//     const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
//     fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

//     expect(mockOnSearchChange).toHaveBeenCalledWith('test query');
//   });

//   it('should apply correct theme class', () => {
//     const initialState = {
//       search: { searchInput: '' },
//       theme: { currentTheme: darkTheme },
//     };

//     renderWithRedux(<SearchInput onSearchChange={() => {}} />, {
//       initialState,
//     });

//     const searchInputBlock = screen.getByRole('textbox')
//       .parentElement as HTMLElement;
//     expect(searchInputBlock).toHaveClass('darkTheme');
//   });
// });
