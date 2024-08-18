import React from 'react';
import ImagePreview from '../ui/img/img';
import { FormDataStore } from '../../types/interfaces';
import styles from './render-forms.module.scss';

interface RenderFormProps {
  formData: FormDataStore;
  title: string;
}

const RenderForm: React.FC<RenderFormProps> = ({ formData, title }) => {
  return (
    <div className={styles.renderBlock}>
      <h2>{title}</h2>
      <div className={styles.renderFormsBlock}>
        <p>
          Name: <span className={styles.renderItems}>{formData.name}</span>
        </p>
        <p>
          Age: <span className={styles.renderItems}>{formData.age}</span>
        </p>
        <p>
          Gender: <span className={styles.renderItems}>{formData.gender}</span>
        </p>
        <p>
          Country:{' '}
          <span className={styles.renderItems}>{formData.country}</span>
        </p>
        <p>
          Email: <span className={styles.renderItems}>{formData.email}</span>
        </p>
        <p>
          Password:{' '}
          <span className={styles.renderItems}>{formData.password}</span>
        </p>
        <p>
          Accept:{' '}
          <span className={styles.renderItems}>
            {formData.accept ? 'Yes' : 'No'}
          </span>
        </p>
        <ImagePreview base64Image={formData.img} />
      </div>
    </div>
  );
};

export default RenderForm;
