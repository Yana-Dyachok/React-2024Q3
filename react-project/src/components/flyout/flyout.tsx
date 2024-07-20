import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { unselectAll } from '../../redux/slices/checked-item-slice';
import Button from '../ui/button/button';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import styles from './flyout.module.css';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) =>
    Object.keys(state.checked.checkedItem).filter(
      (uid) => state.checked.checkedItem[uid].checked,
    ),
  );

  const conditions = useSelector((state: RootState) => state.checked);

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    const conditionsArray = Object.values(conditions.checkedItem);
    const worksheet = XLSX.utils.json_to_sheet(conditionsArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const csvData = XLSX.write(workbook, { bookType: 'csv', type: 'array' });

    saveAs(
      new Blob([csvData], { type: 'text/csv;charset=utf-8;' }),
      `${selectedItems.length}_conditions.csv`,
    );
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className={styles.flyout}>
      <p className={styles.flyoutText}>
        {selectedItems.length} items are selected
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
