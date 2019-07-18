const reducer = (state = { loggedin: false }, action) => {
  switch (action.type) {
    case 'login':
      return { loggedin: true, user: action.user };
    case 'logout':
      return { loggedin: false, user: null };
    default:
      return { loggedin: false, user: null };
  }
};

export default reducer;
