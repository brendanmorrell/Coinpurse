import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';


export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);// here and below we can use props.match or props.expense since they are both being sent into the EditExpensePage component
    this.props.history.push('/dashboard');
  };
  onRemove = () => {
    this.props.startRemoveExpense(this.props.expense.id);
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
            buttonContent="Save Expense"
          />
          <button
            className="button button--secondary"
            onClick={this.onRemove}
          >Delete Expense
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({ expense: state.expenses.find((expense) => expense.id === props.match.params.id) });

const mapDispatchToProps = (dispatch, props) => {
  return {
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
