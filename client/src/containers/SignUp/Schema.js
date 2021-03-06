import * as Yup from 'yup';

export const inputs = [
  {
    type: 'name',
  },
  {
    type: 'email',
  },
  {
    type: 'password',
  },
];

export const schema = Yup.object().shape({
  name: Yup
    .string()
    .required()
    .label('Name'),
  email: Yup
    .string().email()
    .required()
    .label('Email'),
  password: Yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Min 8 characters and must contain at least one lowercase letter, one uppercase and a number.')
    .required().label('Password'),
});
