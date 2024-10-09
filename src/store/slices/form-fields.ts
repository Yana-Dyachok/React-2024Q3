import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormDataStore } from '../../types/interfaces';

interface FormsState {
  forms: FormDataStore[];
}

const initialState: FormsState = {
  forms: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormDataStore>) => {
      state.forms.push(action.payload);
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
