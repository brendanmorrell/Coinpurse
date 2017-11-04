//  REDUCERS
// 1. Reducers are pure functions (doesn't use or change anything from outside the function scope)
// 2. Never change state or action (you want to return a new state usually if that's what you end up trying to d0)


// Expenses Reducer
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
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
