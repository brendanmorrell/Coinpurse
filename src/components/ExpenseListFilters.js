import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import  'react-dates/lib/css/_datepicker.css';

import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, sortReverse } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
    sortReverse: false,
  };
  onDatesChange = ({ startDate, endDate }) => {// he says an object gets passed into this that he destructures. try this without destructuring to see if you understand
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };

  setTextFilter = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortTypeChange = (e) => {
    if (e.target.value === 'date') {
      return this.props.sortByDate();
    }
    return this.props.sortByAmount();
  };
  onSortReverse = () => {
    this.props.sortReverse();
  };
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search expenses..."
          value={this.props.filters.text}
          onChange={this.setTextFilter}
        />
        <select
          value={this.props.filters.sortBy}
          onChange={this.onSortTypeChange}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <input
          type="checkbox"
          onChange={this.onSortReverse}
        />
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          showClearDates={true}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    sortReverse: () => dispatch(sortReverse()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
