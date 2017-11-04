import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

import { connect } from 'react-redux';

export const ExpenseListItem = ({ id, description, amount, createdAt, expenses }) => {
  const formattedAmount = numeral(amount / 100).format('$0, 0.00');

  // Only show year if different from current year
  const displayHours = (expenses.filter((expense) => moment(expense.createdAt).format('D') === moment(createdAt).format('D')).length > 1);
  let dateDisplay;
  const createdThisYear = moment(createdAt).isSame(moment(), 'year');
  if (createdThisYear) {
    if (displayHours) {
      dateDisplay = moment(createdAt).format('MMM Do h:mm a');
    } else {
      dateDisplay = moment(createdAt).format('MMMM Do');
    }
  } else if (!createdThisYear) {
    if (displayHours) {
      dateDisplay = moment(createdAt).format('MMM Do, YYYY h:mm a');
    } else {
      dateDisplay = moment(createdAt).format('MMMM Do, YYYY');
    }
  }

  return (
    <div>
      <Link to={`/edit/${id}`}>
        <h3>{ description }</h3>
      </Link>
      <p>
        { formattedAmount }
        -
        { dateDisplay }
      </p>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
  };
};
export default connect(mapStateToProps)(ExpenseListItem);
