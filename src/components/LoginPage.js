import React from 'react';
import { connect } from 'react-redux';

import { startLoginGoogle, startLoginFacebook } from '../actions/auth';

export const LoginPage = ({ startLoginGoogleProp, startLoginFacebookProp }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className=".box-layout__title">Expensify</h1>
      <p>It&apos;s time to get your expenses under control.</p>
      <button className="button login-spacing " onClick={startLoginGoogleProp}>Login with Google</button>
      <br />
      <button className="button login-spacing " onClick={startLoginFacebookProp}>Login with Facebook</button>
    </div>
  </div>
);


const mapDispatchToProps = (dispatch) => ({
  startLoginGoogleProp: () => dispatch(startLoginGoogle()),
  startLoginFacebookProp: () => dispatch(startLoginFacebook()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
