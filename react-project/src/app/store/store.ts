import { configureStore } from '@reduxjs/toolkit';
import searchInputSlice from '../slices/search-slice';
// import { apiGetByIdSlice } from '../api-slices/api-get-slices';
// import { apiGetSearchSlice } from '../api-slices/api-get-search-slice';
import { apiPostSearchSlice } from '../api-slices/api-post-slice';
const store = configureStore({
  reducer: {
    searchInput: searchInputSlice,
    [apiPostSearchSlice.reducerPath]: apiPostSearchSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiPostSearchSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
