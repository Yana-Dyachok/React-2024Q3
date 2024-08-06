import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import SearchItem from '../components/search-item/search-item';
import { Conditions } from '../types/api-interface';
import checkedItemSlice, {
  CheckedItemState,
} from '../redux/slices/checked-item-slice';
import { ThemeProvider } from '../theme-context/theme-provider';
import { RootState } from '../redux/store/store';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;

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

  beforeEach(() => {
    condition = { uid: '1', name: 'Condition 1', psychologicalCondition: true };
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      query: {},
    });
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
    const router = useRouter();
    renderWithRedux(<SearchItem condition={condition} />, {
      initialState: {
        checked: { checkedItem: {} },
      },
    });

    const detailsButton = screen.getByText('details');
    fireEvent.click(detailsButton);

    expect(router.push).toHaveBeenCalledWith({
      pathname: `/item/${condition.uid}`,
      query: {},
    });
  });
});
