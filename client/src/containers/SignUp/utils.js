import callApi from '../../libs/axios';
import { methods, modules } from '../../constants/constants';

export const handleSubmit = async (event, values, history) => {
  event.preventDefault();
  const { name, email, password } = values;
  const { post } = methods;
  const { user } = modules;
  const result = await callApi(post, `/${user}`, { name, email, password });
  if (result.data) {
    history.push('/signin');
  } else {
    // TODO: Create a component (Toast) to display errors
    alert(result);
  }
}
