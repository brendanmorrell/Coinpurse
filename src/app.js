// MODULES
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';// sets what you want react to use as the redux store
import 'normalize.css/normalize.css';
// FIREBASE
import { firebase } from './firebase/firebase';
// REACT
import AppRouter, { history } from './routers/AppRouter';
// REDUX
import store from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
// CSS
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'// the relevant styling provided by airbnb






const state = store.getState();


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


ReactDOM.render(<p>Loading...</p>, rootApp);



firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    console.log('User logged in with ID: ', user.uid);
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
