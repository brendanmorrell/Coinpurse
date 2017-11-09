import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <header>
    <h1>Expensify!</h1>
    <NavLink to="/dashboard" activeClassName="is-active" exact={true}>Dashboard</NavLink>{/* NavLink has a bunch of different props that allow you to manipulate the link in cool ways */}
    <NavLink to="/create" activeClassName="is-active" exact={true}>Create Expense</NavLink>
    <button onClick={startLogout}> Logout</button>
  </header>
);






const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
