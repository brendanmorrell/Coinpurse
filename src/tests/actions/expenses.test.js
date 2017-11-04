import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';


const createMockStore = configureMockStore([thunk]);


test('should setup remove expense action object', () => {
  const action = removeExpense('123abc');
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc',
  });
});

test('should setup edit expense object', () => {
  const id = 'thisisanid';
  const updates = {
    description: 'new description',
    note: 'new note',
    amount: 'new amount',
    createdAt: 'newCreatedAt',
  };
  const action = editExpense(id, updates);
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'thisisanid',
    updates: {
      description: 'new description',
      note: 'new note',
      amount: 'new amount',
      createdAt: 'newCreatedAt',
    },
  });
});

test('should set up add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2],
  });
});


// ASYNC TESTING
test('should add expense to database and store', (done) => { // must add done so that jest waits for the done call before checking to see if there were any errors, otherwise, it will run through the code, the promises won't have run yet, and since no errors will have come back, it will think it passed even though an error would have been thrown when the promises returned
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'this one is really good',
    createdAt: 1000,
  };
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();// special redux-mock-store function that returns an array of all the actions that were dispatched to the store
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData,
      },
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {};
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();// special redux-mock-store function that returns an array of all the actions that were dispatched to the store
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        note: '',
        description: '',
        amount: 0,
        createdAt: 0,
      },
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual({
      note: '',
      description: '',
      amount: 0,
      createdAt: 0,
    });
    done();
  });
});

// THIS TEST WAS PRIOR TO IMPLEMENTING FIREBASE
// test('it should setup add expense object with default values', () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0,
//     },
//   });
// });
