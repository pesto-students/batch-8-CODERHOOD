import React from "react";
import "./App.css";
import AppContextProvider from "./AppContext";
import UserStatus from "../UserStatus";
import SmallContainer from "../../components/SmallContainer/SmallContainer";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <SmallContainer>
          <UserStatus />
        </SmallContainer>
      </AppContextProvider>
    </div>
  );
}

export default App;
