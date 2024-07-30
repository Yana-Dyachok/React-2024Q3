// import { render, screen } from '@testing-library/react';
// import SearchList from '../components/search-list/search-list';
// import { Conditions } from '../types/api-interface';
// import '@testing-library/jest-dom';

// jest.mock(
//   '../components/search-item/search-item',
//   () =>
//     ({ condition }: { condition: Conditions }) => <div>{condition.name}</div>,
// );

// jest.mock('../components/flyout/flyout', () => () => (
//   <div>Flyout Component</div>
// ));

// describe('SearchList', () => {
//   it('should display "No data found" when conditions array is empty', () => {
//     render(<SearchList conditions={[]} />);
//     expect(screen.getByText('No data found')).toBeInTheDocument();
//   });

//   it('should render SearchItem components when conditions array is not empty', () => {
//     const mockConditions: Conditions[] = [
//       { uid: '1', name: 'Condition 1', psychologicalCondition: false },
//       { uid: '2', name: 'Condition 2', psychologicalCondition: true },
//     ];

//     render(<SearchList conditions={mockConditions} />);

//     expect(screen.getByText('Condition 1')).toBeInTheDocument();
//     expect(screen.getByText('Condition 2')).toBeInTheDocument();
//   });

//   it('should render Flyout component', () => {
//     render(<SearchList conditions={[]} />);
//     expect(screen.getByText('Flyout Component')).toBeInTheDocument();
//   });
// });
