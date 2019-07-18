import * as Yup from 'yup';

export const inputs = [
  {
    type: 'name',
  },
  {
    type: 'bio',
  },
];

export const schema = Yup.object().shape({
  name: Yup
    .string().email()
    .required()
    .label('Full Name'),
  bio: Yup
    .string()
    .label('What I do'),
  phone: Yup
    .string()
    .label('Phone No'),
});