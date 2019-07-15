import callApi from '../../libs/axios';

export const handleSubmit = async (e, user, history) => {
  e.preventDefault();
  const { email, password } = user;
  const result = await callApi('post', '/user/login', { email, password });
  if (result.data) {
    const { Data } = result.data;
    const user = JSON.stringify(Data);
    // TODO: implement JWT in server
    localStorage.setItem('user', user);
    history.push('/workspace');
  } else {
    // TODO: add component (Toast) to display errors;
    alert(result);
  }
}
