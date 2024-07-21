import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConditionsState {
  id: string | null;
  name: string | null;
  psychologicalCondition: boolean | null;
}

const initialState: ConditionsState = {
  id: null,
  name: null,
  psychologicalCondition: null,
};

const descriptionSlice = createSlice({
  name: 'description',
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<ConditionsState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.psychologicalCondition = action.payload.psychologicalCondition;
    },
    clearSelectedItem: (state) => {
      state.id = null;
      state.name = null;
      state.psychologicalCondition = null;
    },
  },
});

export const { setSelectedItem, clearSelectedItem } = descriptionSlice.actions;

export default descriptionSlice.reducer;
