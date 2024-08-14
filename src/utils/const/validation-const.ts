import * as yup from 'yup';

export const createNameValidationSchema = () =>
  yup
    .string()
    .required('*name is required')
    .matches(
      /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s'-]+$/,
      '*name can only contain letters, spaces, hyphens, and apostrophes',
    )
    .min(2, '*name must be at least 2 characters long')
    .max(50, '*name cannot be longer than 50 characters')
    .test(
      'is-capitalized',
      '*name must start with a capital letter',
      (value) => {
        if (!value) return false;
        return value.charAt(0) === value.charAt(0).toUpperCase();
      },
    );

export const createAgeValidationSchema = () =>
  yup
    .string()
    .required('*age is required')
    .matches(/^\d+$/, '*age must be a positive number')
    .test(
      'is-positive',
      '*age must be a number without decimal points or commas',
      (value) => {
        const numberValue = Number(value);
        return numberValue > 0;
      },
    )
    .test('within-range', '*age must be between 0 and 120', (value) => {
      const numberValue = Number(value);
      return numberValue >= 0 && numberValue <= 120;
    });

export const createEmailValidationSchema = () =>
  yup
    .string()
    .required('*email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '*email must be a valid email address (e.g., user@example.com)',
    )
    .max(255, '*email cannot be longer than 255 characters');

export const createPasswordValidationSchema = () =>
  yup
    .string()
    .required('*password is required')
    .min(8, '*password must be at least 8 characters long')
    .matches(/[A-Z]/, '*password must contain at least one uppercase letter')
    .matches(/[a-z]/, '*password must contain at least one lowercase letter')
    .matches(/[0-9]/, '*password must contain at least one number')
    .matches(
      /[@$!%*?&]/,
      '*password must contain at least one special character (@, $, !, %, *, ?, &)',
    )
    .max(255, '*password cannot be longer than 255 characters');

export const createConfirmPasswordValidationSchema = (password: string) => {
  return yup
    .string()
    .required('*password confirmation is required')
    .oneOf([password], "*passwords don't match");
};

export const createImageValidationSchema = () =>
  yup
    .mixed<File>()
    .required('*image is required')
    .test('fileType', '*unsupported File Format', (value) => {
      if (value && value instanceof File) {
        const fileType = value.type;
        return ['image/jpeg', 'image/png'].includes(fileType);
      }
      return false;
    })
    .test('fileSize', '*file size exceeds 5MB', (value) => {
      if (value && value instanceof File) {
        return value.size <= 5 * 1024 * 1024;
      }
      return false;
    });
