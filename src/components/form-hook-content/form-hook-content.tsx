import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from '../../components/input.module.scss';
import InputFormHookTemplate from '../input-form-hook-template/input-form-hook-template';
import ImgInputHook from '../img-Input/img-hook-input';
import InputHookGender from '../input-gender/input-hook-gender';
import InputPassword from '../input-password/input-password';
import InputCountry from '../input-country/input-country';
import Checkbox from '../ui/checkbox/checkbox';
import Button from '../../components/ui/button/button';
import { addFormData } from '../../store/slices/form-fields';
import { FormDataStore } from '../../types/interfaces';
import {
  createNameValidationSchema,
  createImageConvertValidationSchema,
  createAgeValidationSchema,
  createEmailValidationSchema,
  createPasswordValidationSchema,
  createInputValidationSchema,
  createConfirmPasswordValidationSchema,
} from '../../utils/const/validation-const';
import { convertToBase64 } from '../../utils/const/convert-img.ts';

const FormHookContent: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [img, setImg] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: createNameValidationSchema(),
    age: createAgeValidationSchema(),
    gender: createInputValidationSchema(),
    email: createEmailValidationSchema(),
    password: createPasswordValidationSchema(),
    confirmPassword: createConfirmPasswordValidationSchema(password),
    img: createImageConvertValidationSchema(),
    country: createInputValidationSchema(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormDataStore>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const passwordValue = watch('password');
  const fileInput = watch('img');

  React.useEffect(() => {
    if (fileInput && fileInput.length > 0) {
      convertToBase64(fileInput[0] as unknown as File)
        .then((res) => {
          setImg(res);
        })
        .catch((err) => {
          console.log(err, 'err');
        });
    }
  }, [fileInput]);

  React.useEffect(() => {
    setPassword(passwordValue);
  }, [passwordValue]);

  const handleFormSubmit: SubmitHandler<FormDataStore> = (data) => {
    dispatch(addFormData({ ...data, img }));
    navigate('/');
  };

  const formatErrors = (error?: { message?: string }): string[] => {
    return error?.message ? [error.message] : [];
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      className={styles.form}
    >
      <div className={styles.formInner}>
        <InputFormHookTemplate
          error={formatErrors(errors.name)}
          text="Jane"
          type="text"
          name="name"
          register={register}
        />
        <InputFormHookTemplate
          error={formatErrors(errors.age)}
          text=""
          type="number"
          name="age"
          register={register}
        />
        <InputFormHookTemplate
          error={formatErrors(errors.email)}
          name="email"
          text="user@example.com"
          type="email"
          register={register}
        />
        <InputPassword
          error={formatErrors(errors.password)}
          register={register}
          name="password"
        />
        <InputPassword
          error={formatErrors(errors.confirmPassword)}
          register={register}
          name="confirmPassword"
        />
        <InputCountry
          error={formatErrors(errors.country)}
          register={register}
        />
        <InputHookGender
          error={formatErrors(errors.gender)}
          name="gender"
          register={register}
        />
        <Checkbox
          name="accept"
          label="accept Terms and Conditions agreement"
          type="checkbox"
          register={register}
        />
        <ImgInputHook
          error={formatErrors(errors.img)}
          name="img"
          register={register}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button btnType="submit" disabled={!isValid}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default FormHookContent;
