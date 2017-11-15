import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';// this is an airbnb available module that gives a calendar. other versions also available

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      errorDescription: '',
      errorAmount: '',
      errorDate: '',
      dateMessage: '',
    };
  }
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description, errorDescription: '' }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      return this.setState(() => ({ amount, errorAmount: '' }));
    }
    return undefined;
  };
  onDateChange = (createdAt) => { // this function takes a moment input
    this.setState(() => ({ createdAt, errorDate: '' }));
    if (!moment(createdAt)._isValid) {
      return this.setState(() => ({ dateMessage: 'DD/MM/YYYY' }));
    }
    return this.setState(() => ({ dateMessage: '' }));
  };
  onFocusChange = ({ focused }) => { // destructured somehow. not sure where '.focused' is getting pulled from. maybe the focused property in the <SingleDatePicker component?
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount || !this.state.createdAt) {
      if (!this.state.description) {
        this.setState(() => ({ errorDescription: 'Description Required' }));
      }
      if (!this.state.amount) {
        this.setState(() => ({ errorAmount: 'Amount Required' }));
      }
      if (!this.state.createdAt) {
        this.setState(() => ({ errorDate: 'Dates must be formatted DD/MM/YYYY' }));
      }
      return;
    }
    this.props.onSubmit({
      description: this.state.description,
      amount: parseFloat(this.state.amount, 10) * 100, // turns the string into a real number (opposite is parseInt). second arg is the base 10, and the third is because we want cents
      createdAt: this.state.createdAt.valueOf(), // value of is a moment function that takes a moment object and returns it to a unix epock milliseconds value
      note: this.state.note,
    });
  }
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.errorDescription && <p className="form__error">{this.state.errorDescription}</p>}
        <input
          type="text"
          placeholder="Description"
          autoFocus
          className={this.state.errorDescription ? "text-input form-box-error" : "text-input"}
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        {this.state.errorAmount && <p className="form__error">{this.state.errorAmount}</p>}
        <input
          type="text"
          placeholder="Amount"
          className={this.state.errorAmount ? "text-input form-box-error" : "text-input"}
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        {this.state.dateMessage && <span>{this.state.errorDate ? <p className="form__error">{this.state.errorDate}</p> : <p className="date-message">{this.state.dateMessage}</p>}</span>}
        <div className={this.state.errorDate ? "sdp-wrapper sdp-wrapper-error" : "sdp-wrapper"}>
          <SingleDatePicker// date ondatechange focused and onfocuschange are all required props of the component. there are additional optional ones you can add too
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            // the below props are optional
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
        </div>
        <textarea
          placeholder="Add a note for your expense (optional)"
          className="text-area"
          value={this.state.note}
          onChange={this.onNoteChange}
        />
        <div>
          <button className="button">{this.props.buttonContent ? this.props.buttonContent : 'Add Expense' }</button>
        </div>
      </form>
    );
  }
}
