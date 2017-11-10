import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import LoginPage from '../components/LoginPage';
import ExpenseDashboardPage from './../components/ExpenseDashboardPage';
import AddExpensePage from './../components/AddExpensePage';
import EditExpensePage from './../components/EditExpensePage';
import NotFoundPage from './../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  // reactrouterdom syntax is a little strange so we immediately define a jsx tree to define the router configuration based off the current url
  <Router history={history}>
    <div>{/* browser router only handles one child route, so you need to wrap/hide them in a div. */}
      {/* placing an element prior to switch will make it display on every page */}
      <Switch>{/* Switch is like a div in terms of browserrouter taking a single chile. It is a componenet that goes through each componenet to see if there is a url that matches it. switch looks through the list of routes, and stops when it finds the correct one. Thus, if it never finds one, it eventually ends up at the error page we have set up with no path which thus matches everything, and it will match with this rendering our error page */}
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} exact={true} />{/* set the path for the url you want to use for each route and tell what component you want to render for that url. you need to set exact to true, otherwise everything that matches any part of the url will load, so when you load /create it will also load / since that is contained within /create */}
        <PrivateRoute path="/create" component={AddExpensePage} exact={true} />{/* when setting up your routes, you want it to run client side, not have a server request, so you need to tweak webpack config server to send back index.html for all routes and not look for an actual page that exists at this address, since it doesn,t and will actually just be rendered through index.html again. you want react router to figure out what to show to the screen, not the default server action */}
        <PrivateRoute path="/edit/:id" component={EditExpensePage} exact={true} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);
export default AppRouter;
