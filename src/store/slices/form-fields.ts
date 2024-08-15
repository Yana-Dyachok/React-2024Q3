import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../../types/interfaces';

const initialState: FormData = {
  name: '',
  age: '',
  gender: '',
  email: '',
  password: '',
  confirmPassword: '',
  accept: false,
  img: null,
  country: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      return { ...state, ...action.payload };
    },
    resetFormData: () => initialState,
  },
});

export const { setFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;
