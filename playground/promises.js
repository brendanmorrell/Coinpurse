const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({// can only pass a single argument to resolve or reject, so if yo uneed more, you pass an object
      name: 'Bren',
      city: 'CS',
    });
    resolve('this wont run since i can only resolve or(exclusive) reject a single time');
  }, 2000);
});

const rejectedPromise = new Promise((resolve, reject) => {
  reject('something went wrong');
});

console.log('before');

promise.then((data) => {
  console.log(data.name, data.city);
  return data.name;
}).then((name) => {
  console.log('promise chaining: ', name);
}).catch((e) => {
  console.log(e);
});


console.log('after');

rejectedPromise.then((someData) => {
  console.log(someData);
}).catch((error) => {
  console.log('error: ', error);
});


// SECONDARY SYNTAX: PLACE ERROR FUNCTION AS SECOND ARG FOR 'THEN'
// rejectedPromise.then((someData) => {
//   console.log(someData);
// }, (error) => {
//   console.log('error: ', error);
// });
