import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import searchInputSlice from '../slices/search-slice';
import checkedItemSlice from '../slices/checked-item-slice';
import { apiGetByIdSlice } from '../api-slices/api-get-slices';
import { apiGetSearchSlice } from '../api-slices/api-get-search-slice';
import { apiPostSearchSlice } from '../api-slices/api-post-slice';
import themeSlice from '../slices/theme-slice';
import searchResultSlice from '../slices/search-result-slice';
import loadingSlice from '../slices/loading-slice';
import descriptionSlice from '../slices/description-slice';

const combinedReducer = combineReducers({
  searchInput: searchInputSlice,
  theme: themeSlice,
  checked: checkedItemSlice,
  searchResult: searchResultSlice,
  description: descriptionSlice,
  loading: loadingSlice,
  [apiGetByIdSlice.reducerPath]: apiGetByIdSlice.reducer,
  [apiGetSearchSlice.reducerPath]: apiGetSearchSlice.reducer,
  [apiPostSearchSlice.reducerPath]: apiPostSearchSlice.reducer,
});

const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction,
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(apiGetByIdSlice.middleware)
        .concat(apiGetSearchSlice.middleware)
        .concat(apiPostSearchSlice.middleware),
  });

export const wrapper = createWrapper(makeStore, { debug: true });

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
