import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conditions } from '../../types/api-interface';

interface CheckedConditions extends Conditions {
  checked: boolean;
}

interface CheckedItemState {
  checkedItem: Record<string, CheckedConditions>;
}

const initialState: CheckedItemState = {
  checkedItem: {},
};

const checkedItemSlice = createSlice({
  name: 'checked',
  initialState,
  reducers: {
    toggleComplete(state, action: PayloadAction<{ condition: Conditions }>) {
      const id = action.payload.condition.uid;
      if (state.checkedItem[id]) {
        state.checkedItem[id].checked = !state.checkedItem[id].checked;
      } else {
        state.checkedItem[id] = { ...action.payload.condition, checked: true };
      }
    },
    unselectAll(state) {
      state.checkedItem = {};
    },
  },
});

export const { toggleComplete, unselectAll } = checkedItemSlice.actions;
export default checkedItemSlice.reducer;
