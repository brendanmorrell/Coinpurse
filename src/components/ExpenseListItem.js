import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

import { connect } from 'react-redux';

export const ExpenseListItem = ({ id, description, amount, createdAt, note, expenses }) => {
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
    <Link className="list-item" to={`/edit/${id}`}>
      <div
        className="list-item-div-one"
      >
        <h3 className="list-item__title">{ description }</h3>
        <h3 className="list-item__subtitle">{ dateDisplay }</h3>
      </div>
      {note &&
        <div className="list-item-note">
          <span className="list-item__subtitle">{note}</span>
        </div>}
      <h3 className="list-item__data">{ formattedAmount }</h3>
    </Link>
  );
};
const mapStateToProps = (state) => ({ expenses: state.expenses });
export default connect(mapStateToProps)(ExpenseListItem);
