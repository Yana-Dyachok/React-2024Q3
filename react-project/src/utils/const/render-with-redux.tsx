import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import checkedItemSlice, {
  CheckedItemState,
} from '../../redux/slices/checked-item-slice';

export const renderWithRedux = (
  component: React.ReactNode,
  {
    initialState,
    store = configureStore({
      reducer: { checked: checkedItemSlice },
      preloadedState: initialState,
    }),
  } = {} as {
    initialState?: { checked: CheckedItemState };
    store?: ReturnType<typeof configureStore>;
  },
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};
