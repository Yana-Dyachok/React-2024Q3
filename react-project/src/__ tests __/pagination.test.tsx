// import { render, fireEvent } from '@testing-library/react';
// import Pagination from '../components/ui/pagination/pagination';

// describe('Pagination component', () => {
//   const totalPages = 10;
//   const currentPage = 5;
//   const onPageChange = jest.fn();

//   it('renders pagination buttons correctly', () => {
//     const { container, getByText } = render(
//       <Pagination
//         totalPages={totalPages}
//         currentPage={currentPage}
//         onPageChange={onPageChange}
//       />,
//     );
//     const paginationButtons = container.querySelectorAll('.pagination button');
//     expect(paginationButtons.length).toBe(3);
//     const activePage = getByText(currentPage.toString());
//     expect(activePage).toHaveClass('active');
//   });

//   it('calls onPageChange with correct page number on button click', () => {
//     const { getByText } = render(
//       <Pagination
//         totalPages={totalPages}
//         currentPage={currentPage}
//         onPageChange={onPageChange}
//       />,
//     );
//     const pageButton = getByText('3');
//     fireEvent.click(pageButton);
//     expect(onPageChange).toHaveBeenCalledWith(3);
//   });

//   it('disables previous and next buttons correctly on first and last page', () => {
//     const { getByTestId } = render(
//       <Pagination
//         totalPages={totalPages}
//         currentPage={1}
//         onPageChange={onPageChange}
//       />,
//     );

//     const prevButton = getByTestId('prev-button');
//     const nextButton = getByTestId('next-button');

//     expect(prevButton).toBeDisabled();
//     expect(nextButton).not.toBeDisabled();
//   });
// });
