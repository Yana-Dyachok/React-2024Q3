import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import {
  unselectAll,
  selectSelectedItems,
  selectConditionsArray,
} from '../../redux/slices/checked-item-slice';
import Button from '../ui/button/button';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import styles from './flyout.module.css';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();

  const selectedItems = useSelector((state: RootState) =>
    selectSelectedItems(state),
  );
  const conditionsArray = useSelector((state: RootState) =>
    selectConditionsArray(state),
  );

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(conditionsArray);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const csvData = XLSX.write(workbook, { bookType: 'csv', type: 'array' });

      saveAs(
        new Blob([csvData], { type: 'text/csv;charset=utf-8;' }),
        `${selectedItems.length}_conditions.csv`,
      );
    } catch (error) {
      console.error('Error while generating or downloading the file:', error);
    }
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className={styles.flyout}>
      <p className={styles.flyoutText}>
        {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}{' '}
        selected
      </p>
      <Button btnType="button" onClick={handleUnselectAll}>
        Unselect all
      </Button>
      <Button btnType="button" onClick={handleDownload}>
        Download
      </Button>
    </div>
  );
};

export default Flyout;
