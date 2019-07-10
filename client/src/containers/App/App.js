import React from "react";
import "./App.css";
import AppContextProvider from "./AppContext";
import UserStatus from "../UserStatus";
import SmallContainer from "../../components/SmallContainer/SmallContainer";
import SignIn from "../SignIn/SignIn";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        {/* <SmallContainer>
          <UserStatus />
        </SmallContainer> */}
        <SignIn />

      </AppContextProvider>
    </div>
  );
}

export default App;
