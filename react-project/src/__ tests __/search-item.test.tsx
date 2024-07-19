// import { render } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import SearchItem from '../components/search-item/search-item';

// describe('SearchItem component', () => {
//   it('should render condition name correctly', () => {
//     const condition = {
//       uid: '123',
//       name: 'Test Condition',
//       psychologicalCondition: false,
//     };

//     const { getByText } = render(
//       <MemoryRouter>
//         <SearchItem condition={condition} />
//       </MemoryRouter>,
//     );

//     const conditionNameElement = getByText('Test Condition');
//     expect(conditionNameElement).toBeTruthy();
//   });

//   it('should render condition with correct URL', () => {
//     const condition = {
//       uid: 'MEMA0000162645',
//       name: 'Another Condition',
//       psychologicalCondition: true,
//     };

//     const { getByRole } = render(
//       <MemoryRouter>
//         <SearchItem condition={condition} />
//       </MemoryRouter>,
//     );

//     const conditionLinkElement = getByRole('link', { name: condition.name });
//     expect(conditionLinkElement).toHaveAttribute(
//       'href',
//       `/item/${condition.uid}`,
//     );
//   });
// });
