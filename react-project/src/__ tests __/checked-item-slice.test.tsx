import { configureStore } from '@reduxjs/toolkit';
import checkedItemReducer, {
  toggleComplete,
  unselectAll,
  CheckedItemState,
} from '@/app/lib/slices/checked-item-slice';
import { Conditions } from '../types/api-interface';

describe('checkedItemSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        checked: checkedItemReducer,
      },
    });
  });

  it('should handle toggleComplete', () => {
    const condition: Conditions = {
      uid: '1',
      name: 'Test Condition',
      psychologicalCondition: false,
    };

    store.dispatch(toggleComplete({ condition }));
    const state = store.getState() as { checked: CheckedItemState };
    expect(state.checked.checkedItem['1']).toEqual({
      ...condition,
      checked: true,
    });

    store.dispatch(toggleComplete({ condition }));
    const stateAfterToggle = store.getState() as { checked: CheckedItemState };
    expect(stateAfterToggle.checked.checkedItem['1']).toBeUndefined();
  });

  it('should handle unselectAll', () => {
    const condition1: Conditions = {
      uid: '1',
      name: 'Condition 1',
      psychologicalCondition: false,
    };
    const condition2: Conditions = {
      uid: '2',
      name: 'Condition 2',
      psychologicalCondition: false,
    };

    store.dispatch(toggleComplete({ condition: condition1 }));
    store.dispatch(toggleComplete({ condition: condition2 }));
    const initialState = store.getState() as { checked: CheckedItemState };
    expect(initialState.checked.checkedItem['1']).toBeDefined();
    expect(initialState.checked.checkedItem['2']).toBeDefined();
    store.dispatch(unselectAll());
    const stateAfterUnselectAll = store.getState() as {
      checked: CheckedItemState;
    };
    expect(stateAfterUnselectAll.checked.checkedItem).toEqual({});
  });
});
