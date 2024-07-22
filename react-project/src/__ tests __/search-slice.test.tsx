import { createSlice } from '@reduxjs/toolkit';
import { getFromLocalStorage } from '../utils/local-storage/ls-handler';

const initialState = {
  searchInput: getFromLocalStorage('searchQuery') || '',
};

const searchInputSlice = createSlice({
  name: 'searchInput',
  initialState,
  reducers: {
    addSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
  },
});

export const { addSearchInput } = searchInputSlice.actions;
export default searchInputSlice.reducer;
