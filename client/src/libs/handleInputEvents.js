export const handleChange = (setStateFN, state, field) => event => (
    setStateFN({ ...state, [field]: event.target.value })
);

export const handleBlur = (setStateFn, state, field) => (event) => (
    setStateFn({ ...state, [field]: true})
);
