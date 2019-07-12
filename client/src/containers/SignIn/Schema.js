import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup
    .string().email()
    .required()
    .label('Email'),
  password: Yup
    .string()
    .required().label('Password'),
});

const handleErrors = (values, setErrorFn ) => {
  const parsedErrors = {};
  const {
    email,
    password,
  } = values;
  schema.validate({
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
