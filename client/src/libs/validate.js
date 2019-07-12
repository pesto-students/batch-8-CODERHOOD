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