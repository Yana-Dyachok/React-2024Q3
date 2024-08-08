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

  it('should toggle condition as completed and then uncompleted', () => {
    const condition: Conditions = {
      uid: '1',
      name: 'Test Condition',
      psychologicalCondition: false,
    };

    store.dispatch(toggleComplete({ condition }));
    let state = store.getState() as { checked: CheckedItemState };
    expect(state.checked.checkedItem['1']).toEqual({
      ...condition,
      checked: true,
    });

    store.dispatch(toggleComplete({ condition }));
    state = store.getState() as { checked: CheckedItemState };
    expect(state.checked.checkedItem['1']).toBeUndefined();
  });

  it('should handle unselectAll with multiple completed conditions', () => {
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
    let state = store.getState() as { checked: CheckedItemState };
    expect(state.checked.checkedItem['1']).toBeDefined();
    expect(state.checked.checkedItem['2']).toBeDefined();

    store.dispatch(unselectAll());
    state = store.getState() as { checked: CheckedItemState };
    expect(state.checked.checkedItem).toEqual({});
  });

  it('should toggle condition without affecting others', () => {
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
    let state = store.getState() as { checked: CheckedItemState };
    expect(state.checked.checkedItem['1']).toEqual({
      ...condition1,
      checked: true,
    });

    store.dispatch(toggleComplete({ condition: condition2 }));
    state = store.getState() as { checked: CheckedItemState };
    expect(state.checked.checkedItem['2']).toEqual({
      ...condition2,
      checked: true,
    });

    expect(state.checked.checkedItem['1']).toEqual({
      ...condition1,
      checked: true,
    });
  });

  it('should correctly toggle completed status when unselecting', () => {
    const condition: Conditions = {
      uid: '1',
      name: 'Test Condition',
      psychologicalCondition: false,
    };

    store.dispatch(toggleComplete({ condition }));
    let state = store.getState() as { checked: CheckedItemState };
    expect(state.checked.checkedItem['1']).toEqual({
      ...condition,
      checked: true,
    });

    store.dispatch(unselectAll());
    state = store.getState() as { checked: CheckedItemState };
    expect(state.checked.checkedItem['1']).toBeUndefined();

    store.dispatch(toggleComplete({ condition }));
    state = store.getState() as { checked: CheckedItemState };
    expect(state.checked.checkedItem['1']).toEqual({
      ...condition,
      checked: true,
    });
  });
});
