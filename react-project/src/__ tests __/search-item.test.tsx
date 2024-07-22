import { screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import SearchItem from '../components/search-item/search-item';
import { Conditions } from '../types/api-interface';
import { renderWithRedux } from '../utils/const/render-with-redux';
import themeSlice from '../redux/slices/theme-slice';
import checkedItemSlice from '../redux/slices/checked-item-slice';

describe('SearchItem', () => {
  let condition: Conditions;

  beforeEach(() => {
    condition = { uid: '1', name: 'Condition 1', psychologicalCondition: true };
  });

  test('renders condition name and link', () => {
    renderWithRedux(
      <Router>
        <SearchItem condition={condition} />
      </Router>,
      {
        initialState: {
          theme: { currentTheme: 'lightTheme' },
        },
        store: configureStore({
          reducer: { theme: themeSlice, checked: checkedItemSlice },
        }),
      },
    );

    expect(screen.getByText('Condition 1')).toBeInTheDocument();
    expect(screen.getByText('details')).toBeInTheDocument();
  });

  test('checkbox toggles completed state', () => {
    const { store } = renderWithRedux(
      <Router>
        <SearchItem condition={condition} />
      </Router>,
      {
        initialState: {
          theme: { currentTheme: 'lightTheme' },
        },
        store: configureStore({
          reducer: { theme: themeSlice, checked: checkedItemSlice },
        }),
      },
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(store.getState());
  });
});
