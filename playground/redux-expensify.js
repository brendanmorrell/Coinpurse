// REDUCERS
// 1. Reducers are pure functions (doesn't use or change anything from outside the function scope)
// 2. Never change state or action (you want to return a new state usually if that's what you end up trying to d0)

import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';// random id generater module
// ADD_EXPENSE
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0,
  } = {},
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// REMOVE_EXPENSE
const removeExpense = id => ({
  type: 'REMOVE_EXPENSE',
  id,
});
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});



// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});
// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});
// SET_START_DATE
const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate,
});

// SET_END_DATE
const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate,
});

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense,
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        }
        return expense;
      });
    default: {
      return state;
    }
  }
};

// Filters Reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate,
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};

// Get Visible expenses
const getVisibleExpenses = (expenses, {
  text,
  sortBy,
  startDate,
  endDate,
}) => expenses.filter((expense) => {
  const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
  const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
  const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) || expense.description.toLowerCase().includes(text.toLowerCase());

  return startDateMatch && endDateMatch && textMatch;
}).sort((a, b) => {
  if (sortBy === 'date') {
    return a.createdAt < b.createdAt ? 1 : -1;
  } else if (a.amount > b.amount) { // SORT BY AMOUNT
    return -1;
  } else if (a.amount < b.amount) {
    return 1;
  }
  return a.description < b.description ? -1 : 1;// set equivalent values as alphabetical. could change this to defaulting to createdAt when amount is the same
});

// Store creation
const store = createStore(
  combineReducers({// takes an object with key value pairs of key:rootStateName, value:appropriateReducerForThis
    expenses: expensesReducer,
    filters: filtersReducer,
  }),
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const { id: id1 } = store.dispatch(addExpense({ description: 'Trent', amount: 100, createdAt: 100 })).expense;
const { id: id2 } = store.dispatch(addExpense({ description: 'Zoffee', amount: 100, createdAt: 1100 })).expense;
const { id: id3 } = store.dispatch(addExpense({ description: 'Toothpaste', amount: 100, createdAt: 500 })).expense;


store.dispatch(sortByAmount());
