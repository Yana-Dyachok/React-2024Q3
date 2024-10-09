import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { COUNTRY_LIST } from '../../utils/const/const';
export interface CountryState {
  countries: string[];
}

const initialState: CountryState = {
  countries: COUNTRY_LIST,
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countrySlice.actions;
export default countrySlice.reducer;
