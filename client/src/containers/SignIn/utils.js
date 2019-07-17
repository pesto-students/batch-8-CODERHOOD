import callApi from '../../libs/axios';

export const handleSubmit = async (e, user, history, dispatch) => {
  e.preventDefault();
  const { email, password } = user;
  const result = await callApi('post', '/user/login', { email, password });
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
