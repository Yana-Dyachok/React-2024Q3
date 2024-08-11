'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { setSelectedItem } from '@/lib/slices/description-slice';
import Loading from '../../components/ui/loading/loading';
import styles from './description-item.module.css';
import fetchMedicalConditionById from '@/api/api-get-byid';
import { useTheme } from '../../theme-context/theme-context';
import { Conditions } from '@/types/api-interface';

const DescriptionItem: React.FC = () => {
  const [condition, setCondition] = useState<Conditions | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const pathname = usePathname();
  const itemId = pathname.split('/').pop() || '';

  const descriptionLoading = useSelector(
    (state: RootState) => state.loading.descriptionLoading,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetchMedicalConditionById(itemId);
        setCondition(response);
      } catch (error) {
        console.error('Error fetching medical condition:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, [itemId]);

  useEffect(() => {
    if (condition) {
      dispatch(
        setSelectedItem({
          id: itemId || null,
          name: condition.name,
          psychologicalCondition: condition.psychologicalCondition,
        }),
      );
    }
  }, [condition, itemId, dispatch]);

  const { theme } = useTheme();
  const themeClass = theme === 'light' ? styles.lightTheme : styles.darkTheme;

  return (
    <div className={`${styles.descriptionBlock} ${themeClass}`}>
      {loading || descriptionLoading ? (
        <Loading />
      ) : (
        <>
          <Link href="/" passHref>
            <button
              aria-label="close"
              className={`${styles.closeButton} ${themeClass}`}
            />
          </Link>
          <div className={styles.descriptionContainer}>
            <span>Condition:</span>
            <span className={`${styles.name} ${themeClass}`}>
              {condition?.name || 'No name available'}
            </span>
            <span className={styles.descriptionTitle}>
              {`It's ${
                condition?.psychologicalCondition ? '' : 'not'
              } a psychological condition`}
            </span>
            <div className={`${styles.medicalIcon} ${themeClass}`}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default DescriptionItem;
