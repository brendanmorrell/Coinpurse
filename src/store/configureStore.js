import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

// could just add 'applyMiddleware(thunk)' where the redux devtools thing is, but that would stop it from working, so we use the const below and make it a little more complicated

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store creation
const store = createStore(
  combineReducers({// takes an object with key value pairs of key:rootStateName, value:appropriateReducerForThis
    expenses: expensesReducer,
    filters: filtersReducer,
    auth: authReducer,
  }),
  composeEnhancers(applyMiddleware(thunk)),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
