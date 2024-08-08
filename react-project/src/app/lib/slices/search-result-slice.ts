import { createSlice } from '@reduxjs/toolkit';

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState: {
    items: [],
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.items = action.payload.items;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const { setSearchResults } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
