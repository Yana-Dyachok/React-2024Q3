import { configureStore } from '@reduxjs/toolkit';
import searchInputSlice from '../slices/search-slice';

export const store = configureStore({
  reducer: {
    searchInput: searchInputSlice,
  },
});

console.log(store.getState());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
