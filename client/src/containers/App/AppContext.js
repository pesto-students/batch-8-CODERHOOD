import React, { createContext, useReducer, useContext } from "react";
import appReducer from "./reducer";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = props => {
  const [loginStatus, dispatch] = useReducer(appReducer, {});

  return (
    <AppContext.Provider value={{ loginStatus, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
