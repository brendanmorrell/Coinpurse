import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { startLoginGoogle, startLoginFacebook, startLoginEmail, createLoginEmail } from '../actions/auth';


export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      generalError: '',
    };
  }
  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({ email }));
    this.setState(() => ({ emailError: '', generalError: '' }));
  }
  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }));
    this.setState(() => ({ passwordError: '', generalError: '' }));
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.startLoginEmailProp(this.state.email, this.state.password).then((resErr) => {
      throw resErr;
    }).catch((err) => {
      if (err.code === 'auth/invalid-email') {
        this.setState(() => ({ emailError: 'Invalid email format' }));
      }
      if (this.state.password.length < 6) {
        this.setState(() => ({ passwordError: 'Passwords must be at least six characters' }));
      } else if (err.code !== 'auth/invalid-email' && this.state.password.length >= 6) {
        if (err.code === 'auth/wrong-password') {
          return this.props.startLoginGoogleProp();
        }
        return this.setState(() => ({ generalError: 'Invalid login' }));
      }
      return undefined;
    });
  }
  onCreateLoginEmail = (e) => {
    e.preventDefault();
    if (validator.isEmail(this.state.email) && this.state.password.length >= 6) {
      return this.props.createLoginEmailProp(this.state.email, this.state.password).then((resErr) => {
        if (resErr.code === 'auth/email-already-in-use') {
          console.log('sahdgsjfgkksdjhfgdhjsagfjdgsahjfasdjfkghsad');
          return this.props.startLoginGoogleProp();
        }
        return undefined;
      });
    }
    if (!validator.isEmail(this.state.email)) {
      this.setState(() => ({ emailError: 'Invalid email' }));
    }
    if (this.state.password.length < 6) {
      this.setState(() => ({ passwordError: 'Passwords must be at least six characters' }));
    }
    return undefined;
  }
  render() {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className=".box-layout__title">Expensify</h1>
          <p>It&apos;s time to get your expenses under control.</p>
          <form
            onSubmit={this.onSubmit}
          >
            {this.state.generalError && <span className="form__error">{this.state.generalError}</span>}
            <input
              type="text"
              placeholder="Email"
              autoFocus
              value={this.state.email}
              onChange={this.onEmailChange}
              className={this.state.emailError || this.state.generalError ? "text-input login-spacing-error form-box-error " : "text-input login-spacing"}
            />
            {this.state.emailError && <span className="form__error">{this.state.emailError}</span>}
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onPasswordChange}
              className={this.state.passwordError || this.state.generalError ? "text-input login-spacing-error form-box-error " : "text-input login-spacing"}
            />
            {this.state.passwordError && <span className="form__error">{this.state.passwordError}</span>}
            <div
              className="login-create-account-div"
            >
              <button
                className="button-login"
              >Login
              </button>
              <button
                className="button-login"
                onClick={this.onCreateLoginEmail}
              >
                Create Account
              </button>
            </div>
          </form>
          <div
            className="login-create-account-div"
          >
            <button className="loginBtn loginBtn--google" onClick={this.props.startLoginGoogleProp}>Login</button>
            <button className="loginBtn loginBtn--facebook" onClick={this.props.startLoginFacebookProp}>Login</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLoginGoogleProp: () => dispatch(startLoginGoogle()),
  startLoginFacebookProp: () => dispatch(startLoginFacebook()),
  startLoginEmailProp: (email, password) => dispatch(startLoginEmail(email, password)),
  createLoginEmailProp: (email, password) => dispatch(createLoginEmail(email, password)),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
