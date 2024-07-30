import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFetchByIdQuery } from '../../redux/api-slices/api-get-slices';
import { RootState } from '../../redux/store/store';
import { lightTheme } from '../../redux/toggle-theme/theme';
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
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
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

  const themeClass =
    currentTheme === lightTheme ? styles.lightTheme : styles.darkTheme;

  return (
    <div className={`${styles.descriptionBlock} ${themeClass}`}>
      {descriptionLoading ? (
        <Loading />
      ) : (
        <>
          <button
            aria-label="close"
            className={`${styles.closeButton} ${themeClass}`}
            onClick={() => router.back()}
          />
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
