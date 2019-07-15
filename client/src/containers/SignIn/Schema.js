import * as Yup from 'yup';

export const inputs = [
  {
    type: 'email',
  },
  {
    type: 'password',
  },
];

export const schema = Yup.object().shape({
  email: Yup
    .string().email()
    .required()
    .label('Email'),
  password: Yup
    .string()
    .required().label('Password'),
});
