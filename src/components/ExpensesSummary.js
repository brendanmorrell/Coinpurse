import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenses, expensesTotal, filters, visibleExpenseCount, visibleExpensesTotal }) => {
  const expenseCount = expenses.length;
  const filteredExpensesCount = expenseCount - visibleExpenseCount;
  const visibleExpenseWord = visibleExpenseCount === 1 ? 'expense' : 'expenses';
  const formattedVisibleExpensesTotal = numeral(visibleExpensesTotal / 100).format('$0,0.00');
  const formattedFilteredExpensesTotal = numeral((expensesTotal - visibleExpensesTotal) / 100).format('$0,0.00');
  // const {
  //   text,
  //   startDate,
  //   endDate,
  // } = filters;
  //
  // const filtersActive = () => {
  //   if (text.length > 0 || startDate !== null || endDate !== null) {
  //     return true;
  //   }
  //   return false;
  // };
  const existingExpensesButFiltered = () => {
    if (expenseCount >= 1 && visibleExpenseCount < 1) {
      return true;
    }
    return false;
  };


  return (
    <div className="page-header">
      <div className="content-container">
        {expenseCount < 1 && <h1 className="page-header__title">No expenses found in database. Go out and spend some money!</h1>}
        {existingExpensesButFiltered() && <h1 className="page-header__title">No expenses match the current filter criteria</h1>}
        {visibleExpenseCount >= 1 && <h1 className="page-header__title">Viewing <span>{visibleExpenseCount}</span> {visibleExpenseWord} totalling <span>{formattedVisibleExpensesTotal}</span></h1>}
        <div className="header-flex">
          <div>
            <Link className="button" to="/create">Add Expense</Link>
          </div>
          {expenseCount !== visibleExpenseCount &&
            <div className="header-filter-message">
              <span><span>{filteredExpensesCount}</span> {filteredExpensesCount === 1 ? 'expense is' : 'expenses are'} being filtered (<span>{formattedFilteredExpensesTotal}</span> total)</span>
            </div>}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenses: state.expenses,
    expensesTotal: selectExpensesTotal(state.expenses),
    filters: state.filters,
    visibleExpenseCount: visibleExpenses.length,
    visibleExpensesTotal: selectExpensesTotal(visibleExpenses),
  };
};
export default connect(mapStateToProps)(ExpensesSummary);
