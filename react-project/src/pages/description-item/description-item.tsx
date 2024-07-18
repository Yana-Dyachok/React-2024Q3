import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useFetchByIdQuery } from '../../app/api-slices/api-get-slices';
import Loading from '../../components/ui/loading/loading';

import styles from './description-item.module.css';

const DescriptionItem: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const { search } = useLocation();

  const { data: condition, error, isLoading } = useFetchByIdQuery(itemId ?? '');
  return (
    <div className={styles.descriptionBlock}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Link to={`..${search}`}>
            <button aria-label="close" className={styles.closeButton} />
          </Link>
          {error ? (
            <div>Error fetching data</div>
          ) : (
            <div className={styles.descriptionContainer}>
              <span>Condition:</span>
              <span className={styles.name}>{condition?.name}</span>
              <span className={styles.descriptionTitle}>
                {`It's ${
                  condition?.psychologicalCondition ? '' : 'not'
                } a psychological condition`}
              </span>
              <div className={styles.medicalIcon}></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DescriptionItem;
