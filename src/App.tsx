import React, { PureComponent } from 'react';
import { Navigation } from './components/molecules/Navigation';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Dash } from './components/pages/Authenticated/Dash';
import { Authentication } from './components/pages';
import { Confirm } from './components/pages/Confirm';
import { Board } from './components/pages/Authenticated/Board';
import { Out } from './components/pages/Out';
import ForgotPassword from './components/pages/ForgotPassword';





class App extends PureComponent {
  state = {
    authenticated: "",
    success: false
  }

  componentDidMount() {
    document.title = "iEatClub"
  }

  confirm = () => this.setState({ success: true })

  close = () => this.setState({ success: false })

  async componentWillMount() {
    const authenticated = await Auth.currentAuthenticatedUser()
    this.setState({ authenticated })
  }
  render() {

    console.log(this.state.authenticated)

    return (
      <React.Fragment>
        <Navigation  >
          {this.state.authenticated ?
            (
              <Dash authenticated={this.state.authenticated} />
            ) :

            (
              <React.Fragment>
                {this.state.success === false ?
                  (
                    <Authentication
                      success={this.state.success}
                      confirm={this.confirm}
                    />
                  )
                  : <Confirm
                    success={this.state.success}
                    close={this.close}
                  />
                }
              </React.Fragment>
            )
          }
        </Navigation>
        <BrowserRouter>
          <Switch>
            <Route path="/protected" render={props => (
              <React.Fragment>
                {this.state.authenticated ? (<Board authenticated={this.state.authenticated} history={props.history} />)
                  : <Authentication success={this.state.success}
                    confirm={this.confirm} />}
              </React.Fragment>
            )} />
            <Route path="/out" render={props => (
              <React.Fragment>
                <Out
                  history={props.history}
                />
              </React.Fragment>
            )} />
            <Route path="/forgot" render={props => (
              <React.Fragment>
                <ForgotPassword
                  history={props.history}
                />
              </React.Fragment>
            )} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
