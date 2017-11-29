import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import DeleteModal from './DeleteModal';
import { startEditExpense } from '../actions/expenses';
import { toggleModal } from '../actions/modal';


export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    const { id } = this.props.expense;
    this.props.startEditExpense(id, expense);// here and below we can use props.match or props.expense since they are both being sent into the EditExpensePage component
    this.props.history.push('/dashboard');
  };
  onDelete = () => {
    const { modal } = this.props;
    console.log(modal);
    this.props.startToggleModal(!modal);
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
            onClick={this.onDelete}
          >Delete Expense
          </button>
          {this.props.pushTD && this.props.history.push('/dashboard')}
          {this.props.modal && <DeleteModal id={this.props.expense.id} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id),
  modal: state.modal.modal,
  pushTD: state.modal.pushTD,
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startToggleModal: (modal) => dispatch(toggleModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
