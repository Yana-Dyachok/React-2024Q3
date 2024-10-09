import React from 'react';
import FormHookContent from '../../components/form-hook-content/form-hook-content';
import styles from '../pages.module.scss';
const FormHookPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Uncontrolled Form</h1>
      <FormHookContent />
    </div>
  );
};

export default FormHookPage;
