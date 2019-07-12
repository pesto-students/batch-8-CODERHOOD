import React from "react";
import { useAppContext } from "../App/AppContext";
import getUser from '../../libs/getUser';

function UserStatus() {
  const { loginStatus, dispatch } = useAppContext();
  const isLoggedIn = loginStatus ? loginStatus.loggedin : false;

  const user = getUser();

  return (
    <div>
      <div>
        Hello World from Slack Clone {isLoggedIn ? 1 : 0}
        <h1>{ user ? `Welcome ${user.name}` : 'Please sign in' }</h1>
      </div>
      <button
        onClick={() => {
          dispatch({ type: "login" });
        }}
      >
        Click
      </button>
    </div>
  );
}

export default UserStatus;
