import React from "react";
import { useAppContext } from "../App/AppContext";

function UserStatus() {
  const { loginStatus, dispatch } = useAppContext();
  const isLoggedIn = loginStatus ? loginStatus.loggedin : false;

  return (
    <div>
      <div>Hello World from Slack Clone {isLoggedIn ? 1 : 0}</div>
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
