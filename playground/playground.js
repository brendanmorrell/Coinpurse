const bar = 10;
let foo = bar;
foo = bar + 10;

const work = new Promise((resolve, reject) => {
  resolve('Some data');
});
work.then((data) => {
  console.log(data, foo);
});

const obj = {
  name: 'Andrew',
  age: 28,
};


document.write(obj.name);
