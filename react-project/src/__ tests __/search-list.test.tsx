// import { render } from '@testing-library/react';
// import SearchList from '../components/search-list/search-list';

// describe('SearchList component', () => {
//   it('should render "No data found" message when conditions array is empty', () => {
//     const { getByText } = render(<SearchList conditions={[]} />);
//     const noDataMessage = getByText('No data found');
//     expect(noDataMessage).toBeInTheDocument();
//   });

//   it('should render SearchItem for each condition in conditions array', () => {
//     const conditions = [
//       { uid: '1', name: 'Condition 1', psychologicalCondition: true },
//       { uid: '2', name: 'Condition 2', psychologicalCondition: false },
//     ];

//     const { getByText } = render(<SearchList conditions={conditions} />);

//     conditions.forEach((condition) => {
//       const conditionNameElement = getByText(condition.name);
//       expect(conditionNameElement).toBeInTheDocument();
//     });
//   });
// });

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import SearchList from '../components/search-list/search-list';

describe('SearchList component', () => {
  it('should render "No data found" message when conditions array is empty', () => {
    const { getByText } = render(
      <MemoryRouter>
        <SearchList conditions={[]} />
      </MemoryRouter>,
    );
    const noDataMessage = getByText('No data found');
    expect(noDataMessage).toBeInTheDocument();
  });

  it('should render SearchItem for each condition in conditions array', () => {
    const conditions = [
      { uid: '1', name: 'Condition 1', psychologicalCondition: true },
      { uid: '2', name: 'Condition 2', psychologicalCondition: false },
    ];

    const { getByText } = render(
      <MemoryRouter>
        <SearchList conditions={conditions} />
      </MemoryRouter>,
    );

    conditions.forEach((condition) => {
      const conditionNameElement = getByText(condition.name);
      expect(conditionNameElement).toBeInTheDocument();
    });
  });
});
