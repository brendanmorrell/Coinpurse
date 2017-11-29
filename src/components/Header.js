import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';


export const Header = ({ dispatchStartLogoutProp, currentUser }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <NavLink className="header__title" to="/dashboard" exact={true}>
          <h1>Expensify</h1>
        </NavLink>{/* DOn''t use it here, but NavLink has a bunch of different props that allow you to manipulate the link in cool ways */}
        <div className="header_logout-justify">
          <span className="header__displayName">{currentUser.displayName || currentUser.email}</span><br />
          <button className="button button--link" onClick={dispatchStartLogoutProp}> Logout</button>
        </div>
      </div>
    </div>
  </header>
);
const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchStartLogoutProp: () => dispatch(startLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
