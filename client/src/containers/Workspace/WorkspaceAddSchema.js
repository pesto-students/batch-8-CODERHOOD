import * as Yup from 'yup';

const schema = Yup.object().shape({
  workspaceName: Yup
    .string()
    .required()
    .label('Workspace Name'),
  // users: Yup
  //   .array()
  //   .ensure()
  //   .required()
  //   .label('Users'),
});

const handleErrors = (values, setErrorFn) => {
  const parsedErrors = {};
  const {
    workspaceName,
    // users,
  } = values;
  schema.validate({
    workspaceName,
    // users,
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
