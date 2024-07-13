import React from 'react';
import styles from './pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePrevious = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          className={`${styles.pageNumber} ${
            1 === currentPage ? styles.active : ''
          }`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>,
      );

      if (startPage > 2) {
        pageNumbers.push(
          <span key="start-ellipsis" className={styles.ellipsis}>
            ...
          </span>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`${styles.pageNumber} ${
            i === currentPage ? styles.active : ''
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="end-ellipsis" className={styles.ellipsis}>
            ...
          </span>,
        );
      }

      pageNumbers.push(
        <button
          key={totalPages}
          className={`${styles.pageNumber} ${
            totalPages === currentPage ? styles.active : ''
          }`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.sliderBtn} ${styles.prev}`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      ></button>
      <div
        className={styles.numbersBlock}
        onClick={(event) => event.stopPropagation()}
      >
        {renderPageNumbers()}
      </div>
      <button
        className={`${styles.sliderBtn} ${styles.next}`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      ></button>
    </div>
  );
};

export default Pagination;
