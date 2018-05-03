import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './pages/IndexPage';
import Search from './pages/SearchPage';

export default () => (<div>
  <Router>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/search" component={Search} />
    </Switch>
  </Router>
</div>);

