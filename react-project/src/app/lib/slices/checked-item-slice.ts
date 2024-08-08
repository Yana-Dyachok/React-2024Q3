import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conditions } from '@/types/api-interface';
import { createSelector } from 'reselect';
import { RootState } from '@/app/lib/store';

export interface CheckedConditions extends Conditions {
  checked: boolean;
}

export interface CheckedItemState {
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
        if (state.checkedItem[id].checked) {
          delete state.checkedItem[id];
        } else {
          state.checkedItem[id].checked = true;
        }
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

const selectCheckedItemState = (state: RootState): CheckedItemState =>
  state.checked;

export const selectCheckedItems = createSelector(
  [selectCheckedItemState],
  (checkedItemState) => {
    const items = checkedItemState.checkedItem;
    const filteredItems = Object.keys(items).reduce(
      (result, key) => {
        if (items[key].checked) {
          result[key] = items[key];
        }
        return result;
      },
      {} as { [uid: string]: { name: string; checked: boolean } },
    );
    return filteredItems;
  },
);

export const selectSelectedItems = createSelector(
  [selectCheckedItems],
  (checkedItems) =>
    Object.keys(checkedItems).filter((uid) => checkedItems[uid].checked),
);

export const selectConditionsArray = createSelector(
  [selectCheckedItems],
  (checkedItems) => Object.values(checkedItems),
);

export const makeSelectIsCompleted = (uid: string) =>
  createSelector(
    [selectCheckedItems],
    (checkedItems) => checkedItems[uid]?.checked || false,
  );
