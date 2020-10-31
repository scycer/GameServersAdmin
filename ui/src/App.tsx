import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthenticatedApp from "./AuthenticatedApp";

import { makeAuthenticator, makeUserManager, Callback } from "react-oidc";

import userManagerConfig from "./config";

const userManager = makeUserManager(userManagerConfig);
const AppWithAuth = makeAuthenticator({
  userManager: userManager,
})(AuthenticatedApp);

class App extends React.Component<any, any> {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <h1>Game Server Manager</h1>
            <p>Game Server Status: {true ? "Running" : "Offline"}</p>
          </Route>

          {/* <Route
            path="/callback"
            render={(routeProps) => (
              <Callback
                onSuccess={(user) => {
                  // `user.state` will reflect the state that was passed in via signinArgs.
                  routeProps.history.push("/");
                }}
                onError={(error) => {}}
                userManager={userManager}
              />
            )}
          /> */}
          {/* <AppWithAuth /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
