import * as firebase from 'firebase';// the '* as firebase' part takes all of the named exports from firebase and dumps them on a variable called firebase

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);

const database = firebase.database();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();


const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
facebookAuthProvider.setCustomParameters({
  prompt: 'select_account',
});
googleAuthProvider.setCustomParameters({
  prompt: 'select_account',
});

export { firebase, facebookAuthProvider, googleAuthProvider, database as default };
