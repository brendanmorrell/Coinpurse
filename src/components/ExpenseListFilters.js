import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, sortReverse } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
    dateMessage: null,
  };
  onDatesChange = ({ startDate, endDate }) => { // he says an object gets passed into this that he destructures. try this without destructuring to see if you understand
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
    if (startDate === null && endDate === null) {
      return this.setState(() => ({ dateMessage: 'Date format is DD/MM/YYYY' }));
    }
    return this.setState(() => ({ dateMessage: null }));
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };
  onSortTypeChange = (e) => {
    if (e.target.value === 'date') {
      return this.props.sortByDate();
    }
    return this.props.sortByAmount();
  };
  onSortReverse = () => {
    this.setState((prevState) => ({ filtersReversed: !prevState }));
    this.props.sortReverse();
  };
  setTextFilter = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  clearAllFilters = () => {
    this.props.setTextFilter('');
    this.props.setStartDate(null);
    this.props.setEndDate(null);
    this.props.sortByDate();
    if (this.props.filters.sortReverse) {
      return this.props.sortReverse();
    }
    return undefined;
  };
  render() {
    return (
      <div>
        <div className="content-container">
          <div className="input-group">
            <div className="input-group__item">
              <input
                type="text"
                className="text-input"
                placeholder="Search expenses"
                value={this.props.filters.text}
                onChange={this.setTextFilter}
              />
            </div>
            <div className="input-filter-combo">
              <select
                className="select"
                value={this.props.filters.sortBy}
                onChange={this.onSortTypeChange}
              >
                <option className="option" value="date">Date</option>
                <option className="option" value="amount">Amount</option>
              </select>
              <button
                className={this.props.filters.sortReverse ? "filters-reversed input-filter-button" : "filters-normal input-filter-button"}
                onClick={this.onSortReverse}
              />
            </div>
            <div className="input-group__item">
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
          </div>
          {this.state.dateMessage && <p className="date-message justify-right ">{this.state.dateMessage}</p>}
          <div className="input-group__button">
            <button
              className="button--clear-filters"
              onClick={this.clearAllFilters}
            >Clear All Filters
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters,
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
