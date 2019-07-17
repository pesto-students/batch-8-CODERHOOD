import * as Yup from 'yup';

const schema = Yup.object().shape({
  workspaceName: Yup
    .string()
    .required()
    .label('Workspace Name'),
});

export default schema;