import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useFetchByIdQuery } from '../../app/api-slices/api-get-slices';
import { RootState } from '../../app/store/store';
import { lightTheme } from '../../toggle-theme/theme';
import { useSelector } from 'react-redux';
import Loading from '../../components/ui/loading/loading';

import styles from './description-item.module.css';

const DescriptionItem: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const { search } = useLocation();
  const { data: condition, error, isLoading } = useFetchByIdQuery(itemId ?? '');
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
  const themeClass =
    currentTheme === lightTheme ? styles.lightTheme : styles.darkTheme;
  return (
    <div className={`${styles.descriptionBlock} ${themeClass}`}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Link to={`..${search}`}>
            <button
              aria-label="close"
              className={`${styles.closeButton}  ${themeClass}`}
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
