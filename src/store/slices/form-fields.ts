import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../../types/interfaces';

interface FormsState {
  forms: FormData[];
}

const initialState: FormsState = {
  forms: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.forms.push(action.payload);
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
