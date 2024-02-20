/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import Navbar from "react-bootstrap/Navbar";
import white_logo from '../../assets/white-logo.png'
import './Style.css';

import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

/**
 * Renders the navbar component with a sign in or sign out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageNavbar = (props) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <Navbar variant="dark" className="navbarStyle">
        <a className="navbar-brand" href="/">
        <img src={white_logo} className='nav-logo' alt="" />
        </a>
        <div className="collapse navbar-collapse justify-content-end">
          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </div>
      </Navbar>
      <br />
      <br />
      <h5>
        <center>
          Welcome to Azure DevBox
        </center>
      </h5>
      <br />
      <br />
      {props.children}
    </>
  );
};