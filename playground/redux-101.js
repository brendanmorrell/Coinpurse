import { createStore } from 'redux';



const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy,
});

const setCount = ({ count = 25 } = {}) => ({
  type: 'SET',
  count,
});

const resetCount = () => ({ type: 'RESET' });


const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        count: state.count + action.incrementBy,
      };
    }
    case 'DECREMENT': {
      const decrementBy = action.decrementBy ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy,
      };
    }
    case 'RESET': {
      return {
        count: 0,
      };
    }
    case 'SET': {
      return {
        count: action.count,
      };
    }
    default:
      return state;
  }
});//first argument must be a function,where it take an argument that is the current state, which we are defining
//you define the default state first, and that is what is used on the initial mount.

console.log('Store On Mount: ', store.getState());//this getState call is a redux function


//unsubscribe takes the return value as just stopping subscribe from running anymore
const unsubscribe = store.subscribe(() => { //calls a function every time the state changes
  console.log(store.getState());
});


store.dispatch(incrementCount());
console.log('count incremented by incrementCount()');


store.dispatch({
  type: 'INCREMENT', //type is required always, but you can add other key value pairs to pass in if you want
  incrementBy: 5,
});
console.log('count incremented with incrementBy set to 5');



store.dispatch(incrementCount());
console.log('count incremented by incrementCount()');


store.dispatch({
  type: 'RESET',
});
console.log('count reset');

store.dispatch({
  type: 'DECREMENT',
  decrementBy: 10,
});
console.log('count decremented by 10');


store.dispatch({
  type: 'SET',
  count: 101,
});
console.log('count set to 101');

store.dispatch(setCount());
console.log('count set to 25 with setCount() and no count argument sent in');


store.dispatch(setCount({ count: 101 }));
console.log('count set back to 101 with setCount() and count argument as {count: 101}');


store.dispatch(resetCount());
console.log('count reset by resetCount()');


store.dispatch((decrementCount()));


unsubscribe();

store.dispatch({
  type: 'DECREMENT',
  decrementBy: 10,
});
