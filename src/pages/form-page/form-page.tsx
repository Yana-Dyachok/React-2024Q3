import React from 'react';
import FormContent from '../../components/form-content/form-content';
import styles from '../pages.module.scss';
const FormPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Controlled Form</h1>
      <FormContent />
    </div>
  );
};

export default FormPage;
