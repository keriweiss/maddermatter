import React, { Component } from 'react';
import {
  HashRouter as Router,
  Link,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import Cezanne from './Cezanne';
import Morandi from './Morandi';
import Nav from './Nav';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    const NavWithRouter = withRouter(Nav);

    return (
      <Router>
        <NavWithRouter />
        <Switch>
          <Route exact path='/morandi' component={Morandi} />
          <Route exact path='/cezanne' component={Cezanne} />
        </Switch>
      </Router>
    );
  }
}

export default App;
