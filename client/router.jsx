import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

const App = React.createClass({
  render() {
    return (
      <AppLayout>
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
          <IndexRoute
            component={Home}
          />
          <Route
            path='restaurant'
            component={RestaurantTable}
          />
          <Route
            path='restaurant/:id'
            component={BundleListTable}
          />
          <Route
            path='bundle/:id'
            component={BundleTable}
          />
          <Route
            path='about'
            component={AboutUs}
          />
          <Route
            path='*'
            component={NotFound}
          />
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
