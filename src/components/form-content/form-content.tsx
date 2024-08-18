import * as yup from 'yup';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertToBase64 } from '../../utils/const/convert-img';
import InputFormTemlate from '../input-form-template/input-form-template';
import ImgInput from '../img-Input/img-input';
import InputPassword from '../../components/input-password/input-password';
import InputGender, { InputGenderRef } from '../input-gender/input-gender';
import InputCountry from '../input-country/input-country';
import Button from '../../components/ui/button/button';
import {
  createNameValidationSchema,
  createImageValidationSchema,
  createAgeValidationSchema,
  createInputValidationSchema,
  createEmailValidationSchema,
  createPasswordValidationSchema,
  createConfirmPasswordValidationSchema,
} from '../../utils/const/validation-const';
import Checkbox from '../ui/checkbox/checkbox';
import { useDispatch } from 'react-redux';
import { addFormData } from '../../store/slices/form-fields';
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
    inputCountryRef: React.createRef<HTMLInputElement>(),
  };

  const nameErrorRef = useRef<string[]>([]);
  const imgErrorRef = useRef<string[]>([]);
  const ageErrorRef = useRef<string[]>([]);
  const genderErrorRef = useRef<string[]>([]);
  const emailErrorRef = useRef<string[]>([]);
  const passwordErrorRef = useRef<string[]>([]);
  const passwordConfirmErrorRef = useRef<string[]>([]);
  const countryErrorRef = useRef<string[]>([]);

  const [, forceUpdate] = useState(false);

  type FormField<T> = {
    value: T;
    validationSchema: yup.Schema<T>;
    errorRef: React.MutableRefObject<string[]>;
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
      country: FormField<string>;
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
        validationSchema: createInputValidationSchema(),
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
      country: {
        value: refList.inputCountryRef.current?.value || '',
        validationSchema: createInputValidationSchema(),
        errorRef: countryErrorRef,
      },
    };

    let isValid = true;

    for (const key of Object.keys(formFields)) {
      const field = formFields[key as keyof typeof formFields];

      if ('validationSchema' in field && 'errorRef' in field) {
        try {
          await field.validationSchema.validate(field.value, {
            abortEarly: false,
          });
          field.errorRef.current = [];
        } catch (validationError) {
          if (validationError instanceof yup.ValidationError) {
            field.errorRef.current = validationError.errors;
          }
          isValid = false;
        }
      }
    }

    forceUpdate((prev) => !prev);
    if (isValid) {
      const base64Image = formFields.img.value
        ? await convertToBase64(formFields.img.value)
        : null;
      dispatch(
        addFormData({
          name: formFields.name.value,
          age: formFields.age.value,
          gender: formFields.gender.value,
          email: formFields.email.value,
          password: formFields.password.value,
          confirmPassword: formFields.confirmPassword.value,
          accept: formFields.accept.value,
          img: base64Image,
          country: formFields.country.value,
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
        <InputFormTemlate
          error={nameErrorRef.current}
          name="name"
          text="Jane"
          type="text"
          ref={refList.inputNameRef}
        />
        <InputFormTemlate
          error={ageErrorRef.current}
          name="age"
          type="number"
          ref={refList.inputAgeRef}
        />
        <InputPassword
          error={passwordErrorRef.current}
          ref={refList.inputPasswordRef}
          name="password"
        />
        <InputPassword
          error={passwordConfirmErrorRef.current}
          ref={refList.inputConfirmPasswordRef}
          name="confirmPassword"
        />
        <InputFormTemlate
          error={emailErrorRef.current}
          name="email"
          text="user@example.com"
          type="email"
          ref={refList.inputEmailRef}
        />
        <InputCountry
          error={countryErrorRef.current}
          ref={refList.inputCountryRef}
        />
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
        <ImgInput error={imgErrorRef.current} ref={refList.inputImgRef} />
      </div>
      <div className={styles.buttonContainer}>
        <Button btnType="submit">Submit</Button>
      </div>
    </form>
  );
};

export default FormContent;
