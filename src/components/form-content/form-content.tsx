import * as yup from 'yup';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputName from '../../components/input-name/input-name';
import InputAge from '../../components/input-age/input-age';
import ImgInput from '../img-Input/img-input';
import InputEmail from '../../components/input-email/input-email';
import InputPassword from '../../components/input-password/input-password';
import InputGender, { InputGenderRef } from '../input-gender/input-gender';
import Button from '../../components/ui/button/button';
import {
  createNameValidationSchema,
  createImageValidationSchema,
  createAgeValidationSchema,
  createGenderValidationSchema,
  createEmailValidationSchema,
  createPasswordValidationSchema,
  createConfirmPasswordValidationSchema,
} from '../../utils/const/validation-const';
import Checkbox from '../ui/checkbox/checkbox';
import { useDispatch } from 'react-redux';
import { setFormData } from '../../store/slices/form-fields';
import styles from '../../components/input.module.scss';

const FormContent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refList = {
    formRef: React.createRef<HTMLFormElement>(),
    inputNameRef: React.createRef<HTMLInputElement>(),
    inputImgRef: React.createRef<HTMLInputElement>(),
    inputAgeRef: React.createRef<HTMLInputElement>(),
    inputGenderRef: React.createRef<InputGenderRef>(),
    inputEmailRef: React.createRef<HTMLInputElement>(),
    inputPasswordRef: React.createRef<HTMLInputElement>(),
    inputConfirmPasswordRef: React.createRef<HTMLInputElement>(),
    inputAcceptRef: React.createRef<HTMLInputElement>(),
  };

  const nameErrorRef = useRef<string>('');
  const imgErrorRef = useRef<string>('');
  const ageErrorRef = useRef<string>('');
  const genderErrorRef = useRef<string>('');
  const emailErrorRef = useRef<string>('');
  const passwordErrorRef = useRef<string>('');
  const passwordConfirmErrorRef = useRef<string>('');

  const [, forceUpdate] = useState(false);

  type FormField<T> = {
    value: T;
    validationSchema: yup.Schema<T>;
    errorRef: React.MutableRefObject<string>;
  };

  const validateForm = async (): Promise<boolean> => {
    const formFields: {
      name: FormField<string>;
      age: FormField<number | string>;
      gender: FormField<string>;
      email: FormField<string>;
      password: FormField<string>;
      confirmPassword: FormField<string>;
      accept: { value: boolean };
      img: FormField<File | null>;
    } = {
      name: {
        value: refList.inputNameRef.current?.value || '',
        validationSchema: createNameValidationSchema(),
        errorRef: nameErrorRef,
      },
      age: {
        value: Number(refList.inputAgeRef.current?.value) || 0,
        validationSchema: createAgeValidationSchema(),
        errorRef: ageErrorRef,
      },
      gender: {
        value: refList.inputGenderRef.current?.getValue() || '',
        validationSchema: createGenderValidationSchema(),
        errorRef: genderErrorRef,
      },
      email: {
        value: refList.inputEmailRef.current?.value || '',
        validationSchema: createEmailValidationSchema(),
        errorRef: emailErrorRef,
      },
      password: {
        value: refList.inputPasswordRef.current?.value || '',
        validationSchema: createPasswordValidationSchema(),
        errorRef: passwordErrorRef,
      },
      confirmPassword: {
        value: refList.inputConfirmPasswordRef.current?.value || '',
        validationSchema: createConfirmPasswordValidationSchema(
          refList.inputPasswordRef.current?.value || '',
        ),
        errorRef: passwordConfirmErrorRef,
      },
      accept: {
        value: refList.inputAcceptRef.current?.checked || false,
      },
      img: {
        value: refList.inputImgRef.current?.files?.[0] || null,
        validationSchema: createImageValidationSchema(),
        errorRef: imgErrorRef,
      },
    };
    let isValid = true;

    for (const key of Object.keys(formFields)) {
      const field = formFields[key as keyof typeof formFields];

      if ('validationSchema' in field && 'errorRef' in field) {
        try {
          await field.validationSchema.validate(field.value);
          field.errorRef.current = '';
        } catch (validationError) {
          field.errorRef.current = (
            validationError as yup.ValidationError
          ).message;
          isValid = false;
        }
      }
    }
    forceUpdate((prev) => !prev);
    if (isValid) {
      dispatch(
        setFormData({
          name: formFields.name.value,
          age: formFields.age.value,
          gender: formFields.gender.value,
          email: formFields.email.value,
          password: formFields.password.value,
          confirmPassword: formFields.confirmPassword.value,
          accept: formFields.accept.value,
          img: formFields.img.value,
        }),
      );
    }
    return isValid;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = await validateForm();

    if (isFormValid) {
      navigate('/');
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
        <InputEmail error={emailErrorRef.current} ref={refList.inputEmailRef} />
        <InputPassword
          error={passwordErrorRef.current}
          ref={refList.inputPasswordRef}
          text={'Password:'}
        />
        <InputPassword
          error={passwordConfirmErrorRef.current}
          ref={refList.inputConfirmPasswordRef}
          text={'Confirm password:'}
        />
        <ImgInput error={imgErrorRef.current} ref={refList.inputImgRef} />
        <InputGender
          error={genderErrorRef.current}
          ref={refList.inputGenderRef}
        />
        <Checkbox
          name="accept"
          label="accept Terms and Conditions agreement"
          type="checkbox"
          refer={refList.inputAcceptRef}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button btnType="submit">Submit</Button>
      </div>
    </form>
  );
};

export default FormContent;
