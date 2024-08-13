import React, { useRef, useState } from 'react';
import InputName from '../../components/input-name/input-name';
import InputAge from '../../components/input-age/input-age';
import ImgInput from '../../components/img-Input/img-input';
import InputEmail from '../../components/input-email/input-email';
import Button from '../../components/ui/button/button';
import {
  createNameValidationSchema,
  createImageValidationSchema,
  createAgeValidationSchema,
  createEmailValidationSchema,
} from '../../utils/const/validation-const';
import * as yup from 'yup';
import styles from '../../components/input.module.scss';

const FormPage: React.FC = () => {
  const refList = {
    formRef: React.createRef<HTMLFormElement>(),
    inputNameRef: React.createRef<HTMLInputElement>(),
    inputImgRef: React.createRef<HTMLInputElement>(),
    inputAgeRef: React.createRef<HTMLInputElement>(),
    inputEmailRef: React.createRef<HTMLInputElement>(),
  };

  const nameErrorRef = useRef<string>('');
  const imgErrorRef = useRef<string>('');
  const ageErrorRef = useRef<string>('');
  const emailErrorRef = useRef<string>('');

  const [, forceUpdate] = useState(false);

  const validateForm = async (): Promise<boolean> => {
    const nameValue = refList.inputNameRef.current?.value || '';
    const nameValidationSchema = createNameValidationSchema();
    const ageValue = refList.inputAgeRef.current?.value || '';
    const ageValidationSchema = createAgeValidationSchema();
    const emailValue = refList.inputEmailRef.current?.value || '';
    const emailValidationSchema = createEmailValidationSchema();
    const imgValue = refList.inputImgRef.current?.files?.[0] || null;
    const imgValidationSchema = createImageValidationSchema();
    let isValid = true;
    try {
      await nameValidationSchema.validate(nameValue);
      nameErrorRef.current = '';
    } catch (validationError) {
      nameErrorRef.current = (validationError as yup.ValidationError).message;
      isValid = false;
    }

    try {
      await ageValidationSchema.validate(Number(ageValue));
      ageErrorRef.current = '';
    } catch (validationError) {
      ageErrorRef.current = (validationError as yup.ValidationError).message;
      isValid = false;
    }

    try {
      await emailValidationSchema.validate(emailValue);
      emailErrorRef.current = '';
    } catch (validationError) {
      emailErrorRef.current = (validationError as yup.ValidationError).message;
      isValid = false;
    }

    try {
      await imgValidationSchema.validate({ image: imgValue });
      imgErrorRef.current = '';
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        imgErrorRef.current = validationError.errors.join(', ');
      }
      isValid = false;
    }

    forceUpdate((prev) => !prev);

    return isValid;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = await validateForm();

    if (isFormValid) {
      console.log('Form submitted');
    }
  };

  return (
    <form
      ref={refList.formRef}
      onSubmit={handleFormSubmit}
      noValidate
      className={styles.form}
    >
      <div className={styles.formInner}>
        <InputName error={nameErrorRef.current} ref={refList.inputNameRef} />
        <InputAge error={ageErrorRef.current} ref={refList.inputAgeRef} />
        <ImgInput error={imgErrorRef.current} ref={refList.inputImgRef} />
        <InputEmail error={emailErrorRef.current} ref={refList.inputEmailRef} />
      </div>
      <div className={styles.buttonContainer}>
        <Button btnType="submit">Submit</Button>
      </div>
    </form>
  );
};

export default FormPage;
