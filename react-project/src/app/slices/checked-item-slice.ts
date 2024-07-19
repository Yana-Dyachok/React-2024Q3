import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conditions } from '../../types/api-interface';
interface CheckedItemState {
  checkedItem: Record<string, boolean>;
}

const checkedItemSlice = createSlice({
  name: 'checked',
  initialState: {
    checkedItem: {},
  } as CheckedItemState,
  reducers: {
    toggleComplete(state, action: PayloadAction<{ condition: Conditions }>) {
      const id = action.payload.condition.uid;
      state.checkedItem[id] = !state.checkedItem[id];
    },
  },
});

export const { toggleComplete } = checkedItemSlice.actions;
export default checkedItemSlice.reducer;
