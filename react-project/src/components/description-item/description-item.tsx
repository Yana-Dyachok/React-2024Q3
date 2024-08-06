import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useFetchByIdQuery } from '../../redux/api-slices/api-get-slices';
import { RootState } from '../../redux/store/store';
import { useTheme } from '../../theme-context/theme-context';
import { useSelector, useDispatch } from 'react-redux';
import { setDescriptionLoading } from '../../redux/slices/loading-slice';
import { setSelectedItem } from '../../redux/slices/description-slice';
import Loading from '../../components/ui/loading/loading';
import styles from './description-item.module.css';

const DescriptionItem: React.FC = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const id = Array.isArray(itemId) ? itemId[0] : (itemId ?? '');

  const { data: condition, error, isLoading } = useFetchByIdQuery(id);
  const descriptionLoading = useSelector(
    (state: RootState) => state.loading.descriptionLoading,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDescriptionLoading(isLoading));
    if (condition) {
      dispatch(
        setSelectedItem({
          id: id || null,
          name: condition.name,
          psychologicalCondition: condition.psychologicalCondition,
        }),
      );
    }
  }, [isLoading, dispatch, condition, id]);

  const { theme } = useTheme();
  const themeClass = theme === 'light' ? styles.lightTheme : styles.darkTheme;

  const queryWithoutItemId = Object.fromEntries(
    Object.entries(router.query).filter(([key]) => key !== 'itemId'),
  );
  const searchParams = new URLSearchParams(
    queryWithoutItemId as Record<string, string>,
  );
  const backUrl = `/?${searchParams.toString()}`;

  return (
    <div className={`${styles.descriptionBlock} ${themeClass}`}>
      {descriptionLoading ? (
        <Loading />
      ) : (
        <>
          <Link href={backUrl} passHref>
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
