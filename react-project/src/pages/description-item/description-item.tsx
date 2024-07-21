import React, { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useFetchByIdQuery } from '../../redux/api-slices/api-get-slices';
import { RootState } from '../../redux/store/store';
import { lightTheme } from '../../redux/toggle-theme/theme';
import { useSelector, useDispatch } from 'react-redux';
import { setDescriptionLoading } from '../../redux/slices/loading-slice';
import { setSelectedItem } from '../../redux/slices/description-slice';
import Loading from '../../components/ui/loading/loading';
import styles from './description-item.module.css';

const DescriptionItem: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const { search } = useLocation();
  const { data: condition, error, isLoading } = useFetchByIdQuery(itemId ?? '');
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
          id: itemId || null,
          name: condition.name,
          psychologicalCondition: condition.psychologicalCondition,
        }),
      );
    }
  }, [isLoading, dispatch, condition, itemId]);

  const themeClass =
    currentTheme === lightTheme ? styles.lightTheme : styles.darkTheme;

  return (
    <div className={`${styles.descriptionBlock} ${themeClass}`}>
      {descriptionLoading ? (
        <Loading />
      ) : (
        <>
          <Link to={`..${search}`}>
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
