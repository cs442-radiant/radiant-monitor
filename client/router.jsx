import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

const App = React.createClass({
  render() {
    return (
      <AppLayout>
        <div>
          Hello?
        </div>
        {this.props.children}
      </AppLayout>
    );
  }
});

const Routes = React.createClass({
  render() {
    return (
      <Router
        history={browserHistory}
      >
        <Route
          path='/'
          component={App}
        >
        </Route>
      </Router>
    );
  }
});

Meteor.startup(function() {
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);

  ReactDOM.render(<Routes/>, root);
});
