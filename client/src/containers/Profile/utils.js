import callApi from '../../libs/axios';

export const handleSubmit = async (e, user, history, dispatch, props) => {
  e.preventDefault();
  const result = await callApi('put', '/user', { id: user._id, dataToUpdate: { bio: user.bio, phone: user.phone, name: user.name } });
  if (result.data) {
    const { data } = result.data;
    const user = JSON.stringify(data);
    // TODO: implement JWT in server
    dispatch({ type: 'update', user: data });
    localStorage.setItem('user', user);
    props.onClose();
  } else {
    // TODO: add component (Toast) to display errors;
    alert(result);
  }

  console.log(user);
};
