import React from 'react';
import { connect } from 'react-redux';

import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
// adding 'export' is so you can grap the non-connected component for testing. the default export is the one you actually use for the app, and it is connected to the state via redux



export const ExpenseList = (props) => (
  <div>
    {
      props.expenses.length === 0 ? (
        <p>No Expenses currently</p>
      ) : (
        props.expenses.map((expense) => {
          return <ExpenseListItem key={expense.id} {...expense} />;
        })
      )
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(ExpenseList);// with connect, you put in the state info you want access to as the first argument, and this returns a function that you then input an argument in using () and insert the component you want to connect to the store.
// the syntax is a bit weird, but the component is placed outside the connect function
