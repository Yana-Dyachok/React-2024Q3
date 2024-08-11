import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { useNavigate } from '@remix-run/react';
import { Conditions } from '@/types/api-interface';
import SearchItem from '@/components/search-item/search-item';
import checkedItemSlice, {
  CheckedItemState,
  toggleComplete,
} from '@/lib/slices/checked-item-slice';
import { ThemeProvider } from '@/theme-context/theme-provider';
import { RootState } from '@/lib/store';

jest.mock('@remix-run/react', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('@/theme-context/theme-context', () => ({
  ...jest.requireActual('@/theme-context/theme-context'),
  useTheme: jest.fn(),
}));

const mockUseNavigate = useNavigate as jest.Mock;
const mockUseSelector = jest.requireMock('react-redux')
  .useSelector as jest.Mock;
const mockUseDispatch = jest.requireMock('react-redux')
  .useDispatch as jest.Mock;
const mockUseTheme = jest.requireMock('@/theme-context/theme-context')
  .useTheme as jest.Mock;

interface RenderWithReduxOptions {
  initialState?: {
    checked: CheckedItemState;
  };
  store?: EnhancedStore<RootState>;
}

const renderWithRedux = (
  component: React.ReactNode,
  { initialState, store }: RenderWithReduxOptions = {},
) => {
  const mockStore = configureStore({
    reducer: { checked: checkedItemSlice },
    preloadedState: initialState,
  });

  return {
    ...render(
      <Provider store={store || mockStore}>
        <ThemeProvider>{component}</ThemeProvider>
      </Provider>,
    ),
    store: store || mockStore,
  };
};

describe('SearchItem', () => {
  let condition: Conditions;
  let dispatch: jest.Mock;

  beforeEach(() => {
    condition = { uid: '1', name: 'Condition 1', psychologicalCondition: true };
    mockUseNavigate.mockReturnValue(jest.fn());
    mockUseSelector.mockReturnValue(false);
    mockUseTheme.mockReturnValue({ theme: 'light' });
    dispatch = jest.fn();
    mockUseDispatch.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders condition name and link', () => {
    renderWithRedux(<SearchItem condition={condition} />, {
      initialState: {
        checked: { checkedItem: {} },
      },
    });

    expect(screen.getByText('Condition 1')).toBeInTheDocument();
    expect(screen.getByText('details')).toBeInTheDocument();
  });

  test('handles details button click', () => {
    const navigate = mockUseNavigate();
    renderWithRedux(<SearchItem condition={condition} />, {
      initialState: {
        checked: { checkedItem: {} },
      },
    });

    const detailsButton = screen.getByText('details');
    fireEvent.click(detailsButton);

    expect(navigate).toHaveBeenCalledWith(`/item/${condition.uid}?`);
  });

  test('handles checkbox toggle', () => {
    renderWithRedux(<SearchItem condition={condition} />, {
      initialState: {
        checked: { checkedItem: {} },
      },
    });

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatch).toHaveBeenCalledWith(toggleComplete({ condition }));
  });
});
