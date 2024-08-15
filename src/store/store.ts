import { configureStore } from '@reduxjs/toolkit';
import countrySlice from './slices/country-slices';
import formSlice from './slices/form-fields';
const store = configureStore({
  reducer: {
    country: countrySlice,
    form: formSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
