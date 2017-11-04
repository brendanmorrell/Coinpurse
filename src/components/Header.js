import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify!</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>{/* NavLink has a bunch of different props that allow you to manipulate the link in cool ways */}
    <NavLink to="/create" activeClassName="is-active" exact={true}>Create Expense</NavLink>
  </header>
);






export default Header;
