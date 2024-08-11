import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  globalLoading: boolean;
  descriptionLoading: boolean;
}

const initialState: LoadingState = {
  globalLoading: false,
  descriptionLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.globalLoading = action.payload;
    },
    setDescriptionLoading(state, action: PayloadAction<boolean>) {
      state.descriptionLoading = action.payload;
    },
  },
});

export const { setGlobalLoading, setDescriptionLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
