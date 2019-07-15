import callApi from '../../libs/axios';

export const handleSubmit = async (event, values, history) => {
  event.preventDefault();
  const { name, email, password } = values;
  const result = await callApi('post', '/user', { name, email, password });
  if (result.data) {
    history.push('/signin');
  } else {
    // TODO: Create a component (Toast) to display errors
    alert(result);
  }
}
