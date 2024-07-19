// import { render, fireEvent } from '@testing-library/react';
// import Pagination from '../components/ui/pagination/pagination';

// describe('Pagination component', () => {
//   const totalPages = 10;
//   const onPageChange = jest.fn();

//   it('renders page numbers correctly', () => {
//     const { getByText } = render(
//       <Pagination
//         totalPages={totalPages}
//         currentPage={1}
//         onPageChange={onPageChange}
//       />,
//     );

//     expect(getByText('1')).toBeInTheDocument();
//     expect(getByText('2')).toBeInTheDocument();
//     expect(getByText('3')).toBeInTheDocument();
//   });

//   it('calls onPageChange correctly when a page number button is clicked', () => {
//     const { getByText } = render(
//       <Pagination
//         totalPages={totalPages}
//         currentPage={1}
//         onPageChange={onPageChange}
//       />,
//     );
//     fireEvent.click(getByText('2'));
//     expect(onPageChange).toHaveBeenCalledWith(2);
//   });

//   it('disables previous button on first page', () => {
//     const { getByRole } = render(
//       <Pagination
//         totalPages={totalPages}
//         currentPage={1}
//         onPageChange={onPageChange}
//       />,
//     );

//     const prevButton = getByRole('button', { name: 'prev-page' });
//     expect(prevButton).toBeDisabled();
//   });

//   it('disables next button on last page', () => {
//     const { getByRole } = render(
//       <Pagination
//         totalPages={totalPages}
//         currentPage={totalPages}
//         onPageChange={onPageChange}
//       />,
//     );

//     const nextButton = getByRole('button', { name: 'next-page' });
//     expect(nextButton).toBeDisabled();
//   });
// });
