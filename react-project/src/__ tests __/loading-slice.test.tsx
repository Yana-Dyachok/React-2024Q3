import { configureStore } from '@reduxjs/toolkit';
import loadingReducer, {
  setGlobalLoading,
  setDescriptionLoading,
} from '../redux/slices/loading-slice';

describe('loadingSlice', () => {
  const store = configureStore({
    reducer: {
      loading: loadingReducer,
    },
  });

  it('should handle initial state', () => {
    const state = store.getState().loading;
    expect(state).toEqual({
      globalLoading: false,
      descriptionLoading: false,
    });
  });

  it('should handle setGlobalLoading', () => {
    store.dispatch(setGlobalLoading(true));
    const state = store.getState().loading;
    expect(state.globalLoading).toBe(true);

    store.dispatch(setGlobalLoading(false));
    expect(store.getState().loading.globalLoading).toBe(false);
  });

  it('should handle setDescriptionLoading', () => {
    store.dispatch(setDescriptionLoading(true));
    const state = store.getState().loading;
    expect(state.descriptionLoading).toBe(true);

    store.dispatch(setDescriptionLoading(false));
    expect(store.getState().loading.descriptionLoading).toBe(false);
  });
});
