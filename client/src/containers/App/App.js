import React from "react";
import "./App.css";
import AppContextProvider from "./AppContext";
import UserStatus from "../UserStatus";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <UserStatus />
      </AppContextProvider>
    </div>
  );
}

export default App;
