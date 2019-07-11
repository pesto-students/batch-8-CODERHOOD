import React from "react";
import "./App.css";
import AppContextProvider from "./AppContext";
import UserStatus from "../UserStatus";
import SmallContainer from "../../components/SmallContainer/SmallContainer";
import Header from "../../components/Header/Header";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Header workspaceName="#CoderHood" />
        <SmallContainer>
          <UserStatus />
        </SmallContainer>
      </AppContextProvider>
    </div>
  );
}

export default App;
