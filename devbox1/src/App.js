
import React, { useState } from 'react';
import { PageNavbar } from './Components/Login/PageNavbar';
import { loginRequest } from './authConfig'
import { callMsGraph } from './graph';
import { ProfileData } from './Components/Login/ProfileData';
import { FaTrash } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import { RequestContextProvider } from './Components/Pages/User_Dashboard/RequestContext';


import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

import './App.css';

import Button from 'react-bootstrap/Button';
import Popup, { RequestForm } from './Components/Pages/User_Dashboard/RequestForm';
import EnvironmentTable from './Components/Pages/User_Dashboard/EvironmentOwned'
import { DeleteButton } from './Components/Pages/User_Dashboard/delete';
import { SettingsButton } from './Components/Pages/User_Dashboard/settings';

  /**
* Renders information about the signed-in user or a button to retrieve data about the user
*/
const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
      // Silently acquires an access token which is then attached to a request for MS Graph data
      instance
          .acquireTokenSilent({
              ...loginRequest,
              account: accounts[0],
          })
          .then((response) => {
              callMsGraph(response.accessToken).then((response) => setGraphData(response));
          });
  }

  return (
      <>
          <h5 className="card-title">Welcome {accounts[0].name}</h5>
          <br/>
          {graphData ? (
              <ProfileData graphData={graphData} />
          ) : (
              <Button variant="secondary" onClick={RequestProfileData}>
                  Request Profile Information
              </Button>
          )}
      </>
  );
};
/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const UserDashboard = () => {
    const [buttonPopup, setButtonPopup] = useState(false);

    return (
        <div className='requests'>
            <main>
                <div className="flex-container">
                    <button className="button new-request-button" onClick={() => setButtonPopup(true)}>
                        <span className='plus-icon'>+</span> 
                        <span className='btn-text'>Request</span>
                    </button>
                    <button className="button settings-button" onClick={() => {/* Handle settings button click */}}>
                        <FaCog />
                        <span>Manage</span>
                    </button>
                    <button className="button delete-button" onClick={() => {/* Handle delete button click */}}>
                        <FaTrash />
                        <span>Delete</span>
                    </button>
                </div>
                <EnvironmentTable />
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup} />
            </main>
        </div>
    );
};





const MainContent = () => {
  return (
      <div className="App">
          <AuthenticatedTemplate>
              {/* <ProfileContent /> */}
              <UserDashboard />
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
              <h5>
                  <center>
                      Please sign-in to see your profile information.
                  </center>
              </h5>
          </UnauthenticatedTemplate>
      </div>
  );
};

export default function App() {
    const [graphData, setGraphData] = useState(null);
  return (
    <RequestContextProvider>
      <PageNavbar>
          <center>
              <MainContent setGraphData={setGraphData}/>
          </center>
      </PageNavbar>
      </RequestContextProvider>
  );
}