export const isTouched = (touchedState) => {
  return !!Object.keys(touchedState).length;
}

export const getError = (field, touchedState, errorState) => {
  if (touchedState[field]) {
    return errorState[field];
  }
  return null;
}

export const hasError = (errorState) => {
  return !!Object.keys(errorState).length;
}

export const handleErrors = (schema, values, setErrorFn ) => {
  const parsedErrors = {};
  schema.validate(
  values, { abortEarly: false })
    .then(() => setErrorFn({}))
    .catch((error) => {
      error.inner.forEach((element) => {
        parsedErrors[element.path] = element.path ? element.message : '';
      });
      setErrorFn({ ...parsedErrors })
    });
}