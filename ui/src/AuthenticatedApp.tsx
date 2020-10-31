import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserData } from "react-oidc";

class AuthenticatedApp extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  static contextType = UserData;

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="App">
          <main>
            <Switch>
              <Route path="/">
                <h1>Welcome</h1>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default AuthenticatedApp;
