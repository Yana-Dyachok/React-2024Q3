import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useFetchByIdQuery } from '@/app/lib/api-slices/api-get-slices';
import { RootState } from '@/app/lib/store';
import { useTheme } from '../../theme-context/theme-context';
import { useSelector, useDispatch } from 'react-redux';
import { setDescriptionLoading } from '@/app/lib/slices/loading-slice';
import { setSelectedItem } from '@/app/lib/slices/description-slice';
import Loading from '../../components/ui/loading/loading';
import styles from './description-item.module.css';

const DescriptionItem: React.FC = () => {
  const pathname = usePathname();

  const itemId = pathname.split('/').pop() || '';

  const { data: condition, error, isLoading } = useFetchByIdQuery(itemId);
  const descriptionLoading = useSelector(
    (state: RootState) => state.loading.descriptionLoading,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDescriptionLoading(isLoading));
    if (condition) {
      dispatch(
        setSelectedItem({
          id: itemId || null,
          name: condition.name,
          psychologicalCondition: condition.psychologicalCondition,
        }),
      );
    }
  }, [isLoading, dispatch, condition, itemId]);

  const { theme } = useTheme();
  const themeClass = theme === 'light' ? styles.lightTheme : styles.darkTheme;

  return (
    <div className={`${styles.descriptionBlock} ${themeClass}`}>
      {descriptionLoading ? (
        <Loading />
      ) : (
        <>
          <Link href="/" passHref>
            <button
              aria-label="close"
              className={`${styles.closeButton} ${themeClass}`}
            />
          </Link>
          {error ? (
            <div>Error fetching data</div>
          ) : (
            <div className={styles.descriptionContainer}>
              <span>Condition:</span>
              <span className={`${styles.name} ${themeClass}`}>
                {condition?.name}
              </span>
              <span className={styles.descriptionTitle}>
                {`It's ${
                  condition?.psychologicalCondition ? '' : 'not'
                } a psychological condition`}
              </span>
              <div className={`${styles.medicalIcon} ${themeClass}`}></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DescriptionItem;
