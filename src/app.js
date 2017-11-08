// MODULES
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';// sets what you want react to use as the redux store
import 'normalize.css/normalize.css';
// FIREBASE
import './firebase/firebase';
// REACT
import AppRouter from './routers/AppRouter';
// REDUX
import store from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import { startSetExpenses, addExpense } from './actions/expenses';

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

ReactDOM.render(<p>Loading...</p>, rootApp);

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, rootApp);
});
