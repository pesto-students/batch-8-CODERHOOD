import React from "react";
import "./App.css";
import AppContextProvider from "./AppContext";
import UserStatus from "../UserStatus";
import SmallContainer from "../../components/SmallContainer/SmallContainer";
import SidebarList from "../../components/SidebarList/SidebarList";
import { Link } from 'react-router-dom';

function App() {
  const quickLinks = [
    <Link to="/signin">Sign In</Link>,
    <Link to="/signup">Sign Up</Link>,
    <Link to="/workspace">Workspace</Link>,
    <Link to="/workspace/new">Create New Workspace</Link>,
  ];
  return (
    <div className="App">
      <AppContextProvider>
        <SmallContainer>
          <UserStatus />
          <br />
          <div className="has-text-left">
            <SidebarList 
              heading="Quick Navigation"
              list={quickLinks}
            />
          </div>
        </SmallContainer>
      </AppContextProvider>
    </div>
  );
}

export default App;
