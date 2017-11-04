// Get Visible expenses
import moment from 'moment';


export default (expenses, {
  text,
  sortBy,
  startDate,
  endDate,
  sortReverse,
}) => expenses.filter((expense) => {
  const createdAtMoment = moment(expense.createdAt);
  const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
  const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
  const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) || expense.description.toLowerCase().includes(text.toLowerCase());

  return startDateMatch && endDateMatch && textMatch;
}).sort((a, b) => {
  if (!sortReverse) {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (a.amount > b.amount) { // SORT BY AMOUNT BELOW
      return -1;
    } else if (a.amount < b.amount) {
      return 1;
    }
    return a.description < b.description ? -1 : 1;// set equivalent values as alphabetical. could change this to defaulting to createdAt when amount is the same
  } else if (sortReverse) {
    if (sortBy === 'date') {
      return a.createdAt > b.createdAt ? 1 : -1;
    } else if (a.amount < b.amount) {
      return -1;
    } else if (a.amount > b.amount) {
      return 1;
    }
    return a.description > b.description ? -1 : 1;
  }
});
