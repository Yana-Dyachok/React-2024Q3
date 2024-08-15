import React from 'react';
import Header from '../../components/header/header';
import RenderForm from '../../components/render-form/render-form';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import styles from './main-page.module.scss';
const MainPage: React.FC = () => {
  const formData = useSelector((state: RootState) => state.form);

  const hasFormData = Object.values(formData).some((value) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'object') return value !== null;
    return value !== '' && value !== null && value !== undefined;
  });

  return (
    <>
      <Header />
      <div className={styles.renderContainer}>
        {hasFormData && <RenderForm formData={formData} title={'Form'} />}
      </div>
    </>
  );
};

export default MainPage;
