// MODULES
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';// sets what you want react to use as the redux store
import 'normalize.css/normalize.css';
// FIREBASE
import { firebase } from './firebase/firebase';
// REACT
import AppRouter, { history } from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';
// REDUX
import store from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
// CSS
import './styles/styles.scss';






store.getState();


const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const rootApp = document.getElementById('app');

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, rootApp);
    hasRendered = true;
  }
};


ReactDOM.render(<LoadingPage />, rootApp);



firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('User logged in with firebase ID: ', user.uid);
    const { currentUser } = firebase.auth();
    currentUser.providerData.forEach((profile) => {
      console.log(`Sign-in provider:  ${profile.providerId}`);
      console.log(`Provider-specific UID: ${profile.uid}`);
      console.log(`Name: ${profile.displayName}`);
      console.log(`Email: ${profile.email}`);
      console.log(`Photo URL: ${profile.photoURL}`);
    });
    store.dispatch(login(user.uid, currentUser));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
    });
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    console.log('Logged out');
    renderApp();
    history.push('/');
  }
});
