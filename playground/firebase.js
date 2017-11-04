import * as firebase from 'firebase';// the '* as firebase' part takes all of the named exports from firebase and dumps them on a variable called firebase

const config = {
  apiKey: "AIzaSyDlppyHp6y8fHVaKmJMZMDQv8gsdrB4ZAE",
  authDomain: "expensify-9f5b7.firebaseapp.com",
  databaseURL: "https://expensify-9f5b7.firebaseio.com",
  projectId: "expensify-9f5b7",
  storageBucket: "expensify-9f5b7.appspot.com",
  messagingSenderId: "1001717479048",
};
firebase.initializeApp(config);

const fd = firebase.database();

fd.ref().set({// .ref() refereneces the root of the database

  name: 'Brendan Morrell',
  age: 28,
  isSingle: false,
  location: {
    city: 'Colorado Springs',
    state: 'Colorado',
    country: 'US',
  },
}).then(() => {
  console.log('data is saved');
}).catch((e) => {
  console.log('this failed: ', e);
});

// fbdb.ref().set('This is my database'); set will always completely wipe the database, not just update the section you change
fd.ref('age').set({// set the ref to let firebase know what you want to update. If you leave it blank, it will take the root (the entire thing), and 'update it by replacing the entire database with the change you are trying to implement'
  age: 27,
});

fd.ref('location/country').set('Taiwan');

fd.ref('attributes').set({
  height: 68,
  weight: 160,
}).then(() => {
  console.log('wahoooo, buddy! This call worked my friend! grat job, bro!');
}).catch((e) => {
  console.log('ERRRRRROOOOOOR: ', e);
});

fd.ref('isSingle').remove().then(() => {
  console.log('Remove succeeded');
}).catch((e) => {
  console.log('Error: ', e);
});

fd.ref('attributes').set(null);// passing null to set() also removes things


fd.ref().update({// only changes the fields you provide. can also add new stuff and delete stuff by setting it as null
  name: 'Mike',
  age: 54,
  race: 'black',
  location: {
    city: null, // this will delete the city, but also delete all the other info since yuu are updating the entire location object.
  },
});

// if you want to just update the city, do this
fd.ref('location').update({
  city: 'calgary',
});

// but if you want to update both an item in the root, and a nested item while leaving other items, you need to
fd.ref().update({
  job: 'Manager',
  'location/city': 'Boston',
});





fd.ref('expenses').push({
  description: 'description 1',
  note: 'note 1',
  amount: 'amount1',
  createdAt: 12321321434243,
});


// child_removed
fd.ref('expenses').on('child_removed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

// child_changed
fd.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

// child_added
fd.ref('expenses').on('child_added', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});


// fd.ref('expenses')
//   .once('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val(),
//       });
//     });
//     console.log('Original Expenses Array: ', expenses);
//   });
//
// const onValueChange = fd.ref('expenses').on('value', (snapshot) => {
//   const expenses = [];
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val(),
//     });
//   });
//   console.log('Array Changed: ', expenses);
// });
