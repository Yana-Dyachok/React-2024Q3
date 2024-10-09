import RenderForm from '../../components/render-form/render-form';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import styles from './main-page.module.scss';

function MainPage() {
  const forms = useSelector((state: RootState) => state.form.forms);

  return (
    <div className={styles.renderContainer}>
      {forms.length > 0 ? (
        forms.map((form, index) => (
          <RenderForm
            key={`form-${index}`}
            formData={form}
            title={`Form ${index + 1}`}
          />
        ))
      ) : (
        <p>No forms submitted yet.</p>
      )}
    </div>
  );
}

export default MainPage;
