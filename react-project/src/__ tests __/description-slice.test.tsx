import descriptionReducer, {
  setSelectedItem,
  clearSelectedItem,
} from '@/app/lib/slices/description-slice';

describe('description slice', () => {
  const initialState = {
    id: null,
    name: null,
    psychologicalCondition: null,
  };

  it('should return the initial state', () => {
    expect(descriptionReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should handle setSelectedItem', () => {
    const payload = {
      id: '1',
      name: 'Test Name',
      psychologicalCondition: true,
    };

    const expectedState = {
      id: '1',
      name: 'Test Name',
      psychologicalCondition: true,
    };

    const action = setSelectedItem(payload);
    const newState = descriptionReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should handle clearSelectedItem', () => {
    const preloadedState = {
      id: '1',
      name: 'Test Name',
      psychologicalCondition: true,
    };

    const action = clearSelectedItem();
    const newState = descriptionReducer(preloadedState, action);

    expect(newState).toEqual(initialState);
  });
});
