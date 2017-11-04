//OBJECT DESTRUCTURING

const person = {
  name: 'Andrew',
  age: 26,
  location: {
    city: 'Philly',
    temp: 28,
  },
};



/*
USE DESTRUCTURING INSTEAD OF THIS

const name = person.name;
const age = person.age;
*/

const { name, age } = person;

console.log(`${name} is ${age}`);

const { city, temp: temperature, hobby: dirtyHobby = 'mastubating' } = person.location;//the colon space is a renaming effect so it grabs temp off of person.location and makes a new const called temperature

if (city && temperature) {
  console.log(`It's ${temperature} in ${city}. I bet ${name} is ${dirtyHobby}-ing himself.`);
}


//challenge

const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    //name: 'Penguin',
  },
};

const { name: publisherName = 'Self-published' } = book.publisher;


console.log(publisherName);


console.log('***************************************************************************************************');














//ARRAY DESTRUCTURING
const address = ['724 cardley ave', 'medford', 'oregon', '97504', 'usa'];
const [street, , state, zipcode, , planet = 'Earth'] = address;

console.log(`You are in ${state}. Your address is ${street}. Fuck the city, but your zipcode is ${zipcode}. The thing that is defaulted but doesn't exist is the planet, ${planet}.`);

console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, priceSmall, priceMedium, priceLarge] = item;

console.log(`A medium ${itemName} costs ${priceMedium}.`);
