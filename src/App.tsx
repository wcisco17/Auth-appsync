import React, { PureComponent } from 'react';
import { Navigation } from './components/molecules/Navigation';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Dash } from './components/pages/Authenticated/Dash';

class App extends PureComponent {
  state = {
    authenticated: ""
  }

  async componentWillMount() {
    const authenticated = await Auth.currentSession();
    this.setState({ authenticated })
  }
  render() {

    return (
      <React.Fragment>
        {/* {this.state.authenticated ? */}
        <Dash />
        {/* //   : */}
        {/* //   <BrowserRouter>
        //     <Switch>
        //       <Route path="/" component={Navigation} />
        //     </Switch>
        //   </BrowserRouter>
        // } */}
      </React.Fragment>
    );
  }
}

export default App;
