import React, { PureComponent } from 'react';
import { Navigation } from './components/molecules/Navigation';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Dash } from './components/pages/Authenticated/Dash';
import { Authentication } from './components/pages';
import { Confirm } from './components/pages/Confirm';
import { Board } from './components/pages/Authenticated/Board';





class App extends PureComponent {
  state = {
    authenticated: "",
    success: false
  }

  confirm = () => this.setState({ success: true })

  close = () => this.setState({ success: false })

  async componentWillMount() {
    const authenticated = await Auth.currentAuthenticatedUser()
    this.setState({ authenticated })
  }
  render() {


    return (
      <React.Fragment>
        <Navigation  >
          {this.state.authenticated ?
            (
              <Dash authenticated={this.state.authenticated} />
            ) :

            (
              <BrowserRouter>
                <Switch>
                  {this.state.success === false ?
                    <Route exact render={props => {
                      return (
                        <Authentication
                          success={this.state.success}
                          confirm={this.confirm}
                        />
                      )
                    }} path="/" />
                    : <Confirm
                      success={this.state.success}
                      close={this.close}
                    />}
                </Switch>
              </BrowserRouter>
            )
          }
        </Navigation>
        {this.state.authenticated ? (<Board authenticated={this.state.authenticated} />) : <Authentication success={this.state.success}
          confirm={this.confirm} />}
      </React.Fragment>
    );
  }
}

export default App;
