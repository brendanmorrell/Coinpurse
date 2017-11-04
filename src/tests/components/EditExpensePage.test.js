import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let wrapper, historySpy, editExpenseSpy, removeExpenseSpy;

beforeEach(() => {
  editExpenseSpy = jest.fn();
  removeExpenseSpy = jest.fn();
  historySpy = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpenseSpy}
      removeExpense={removeExpenseSpy}
      history={historySpy}
      expense={expenses[2]}
    />,
  );
});

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(editExpenseSpy).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
  expect(historySpy.push).toHaveBeenLastCalledWith('/');
});

test('should handle removeExpense', () => {
  wrapper.find('button').prop('onClick')(expenses[2].id);
  expect(removeExpenseSpy).toHaveBeenLastCalledWith(expenses[2].id);
  expect(historySpy.push).toHaveBeenLastCalledWith('/');
});
