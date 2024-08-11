import { configureStore } from '@reduxjs/toolkit';
import searchInputSlice from './slices/search-slice';
import checkedItemSlice from './slices/checked-item-slice';
import themeSlice from './slices/theme-slice';
import searchResultSlice from './slices/search-result-slice';
import loadingSlice from './slices/loading-slice';
import descriptionSlice from './slices/description-slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      searchInput: searchInputSlice,
      theme: themeSlice,
      checked: checkedItemSlice,
      searchResult: searchResultSlice,
      description: descriptionSlice,
      loading: loadingSlice,
    },
  });

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
