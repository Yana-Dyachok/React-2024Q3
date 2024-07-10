import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import fetchMedicalConditionById from '../../api/api-get';
import { Conditions } from '../../api/api-interface';
import Loading from '../../components/ui/loading/loading';

import styles from './description-item.module.css';

const DescriptionItem: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [condition, setCondition] = useState<Conditions | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { search } = useLocation();

  useEffect(() => {
    if (itemId) {
      const fetchData = async () => {
        try {
          const delay = new Promise((resolve) => setTimeout(resolve, 1000));
          const apiResultPromise = fetchMedicalConditionById(itemId);

          const [apiResult] = await Promise.all([apiResultPromise, delay]);
          setCondition(apiResult);
        } catch (error) {
          console.error('Error fetching data:', error);
          setCondition(null);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [itemId]);

  return (
    <div className={styles.descriptionBlock}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Link to={`..${search}`}>
            <button className={styles.closeButton} />
          </Link>
          <div className={styles.descriptionContainer}>
            <span>Condition:</span>
            <span className={styles.name}>{condition?.name}</span>
            <span className={styles.descriptionTitle}>
              {`It's ${condition?.psychologicalCondition ? '' : 'not'} a psychological condition`}
            </span>
            <div className={styles.medicalIcon}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default DescriptionItem;
