import React, { createContext, useReducer, useContext } from 'react';
import appReducer from './reducer';

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = props => {
  const user = localStorage.getItem('user');
  const initialState = user
    ? { user: JSON.parse(user), loggedin: true }
    : { loggedin: false };
  const [loginStatus, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ loginStatus, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
