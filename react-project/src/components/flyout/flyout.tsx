import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import {
  unselectAll,
  selectSelectedItems,
  selectConditionsArray,
} from '../../redux/slices/checked-item-slice';
import Button from '../ui/button/button';
import styles from './flyout.module.css';

interface CheckedConditions {
  uid: string;
  name: string;
  psychologicalCondition: string;
  checked: boolean;
}

const convertToCSV = (data: CheckedConditions[]): string => {
  if (data.length === 0) {
    return '';
  }
  const headers = Object.keys(data[0]) as Array<keyof CheckedConditions>;
  const rows = data.map((row) =>
    headers
      .map((header) => `"${String(row[header]).replace(/"/g, '""')}"`)
      .join(';'),
  );
  return [headers.join(';'), ...rows].join('\n\n');
};

const handleDownload = (conditionsArray: CheckedConditions[]): string | '' => {
  try {
    const csvContent = convertToCSV(conditionsArray);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error while generating or downloading the file:', error);
    return '/';
  }
};

const Flyout: React.FC = () => {
  const dispatch = useDispatch();

  const selectedItems = useSelector((state: RootState) =>
    selectSelectedItems(state),
  );
  const conditionsArray = useSelector((state: RootState) =>
    selectConditionsArray(state),
  ) as CheckedConditions[];

  const handleUnselectAll = () => {
    dispatch(unselectAll());
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
      <Button
        btnType="button"
        to={handleDownload(conditionsArray)}
        download={`${conditionsArray.length}_conditions.csv`}
      >
        Download
      </Button>
    </div>
  );
};

export default Flyout;
