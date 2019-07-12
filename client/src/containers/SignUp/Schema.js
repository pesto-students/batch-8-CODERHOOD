import * as Yup from 'yup';

const schema = Yup.object().shape({
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

const handleErrors = (values, setErrorFn ) => {
  const parsedErrors = {};
  const {
    name,
    email,
    password,
  } = values;
  schema.validate({
    name,
    email,
    password,
  }, { abortEarly: false })
    .then(() => setErrorFn({ ...{} }))
    .catch((error) => {
      error.inner.forEach((element) => {
        parsedErrors[element.path] = element.path ? element.message : '';
      });
      setErrorFn({ ...parsedErrors })
    });
}

export default handleErrors;
