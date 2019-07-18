import callApi from '../../libs/axios';
import { modules, methods, endpoints } from '../../constants/constants';

export const handleSubmit = async (e, user, history, dispatch) => {
  e.preventDefault();
  const { email, password } = user;
  const { post } = methods;
  const { user: User } = modules;
  const { login } = endpoints;
  const result = await callApi(post, `/${User}/${login}`, { email, password });
  if (result.data) {
    const { data } = result.data;
    const user = JSON.stringify(data);
    // TODO: implement JWT in server
    dispatch({ type: 'login', user: data });
    localStorage.setItem('user', user);
    history.push('/workspaces');
  } else {
    // TODO: add component (Toast) to display errors;
    alert(result);
  }
};
