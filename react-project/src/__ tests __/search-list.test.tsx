// import { render, screen } from '@testing-library/react';
// import SearchList from '../components/search-list/search-list';
// import { Conditions } from '../types/api-interface';

// describe('SearchList', () => {
//   test('displays "No data found" when conditions array is empty', () => {
//     render(<SearchList conditions={[]} />);
//     expect(screen.getByText('No data found')).toBeInTheDocument();
//   });

//   test('renders SearchItem components when conditions are provided', () => {
//     const conditions: Conditions[] = [
//       { uid: '1', name: 'Condition 1', psychologicalCondition:false },
//       { uid: '2', name: 'Condition 2', psychologicalCondition:false}
//     ];

//     render(<SearchList conditions={conditions} />);
//     expect(screen.getByText('Condition 1')).toBeInTheDocument();
//     expect(screen.getByText('Condition 2')).toBeInTheDocument();
//   });
// });
