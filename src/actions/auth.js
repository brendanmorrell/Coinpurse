import { firebase, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase';

let triedGoogle, triedFacebook, triedEmail = false;

export const login = (uid, currentUser) => ({
  type: 'LOGIN',
  uid,
  currentUser,
});

export const startLoginGoogle = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider).catch((e) => {
      if (e.code === 'auth/account-exists-with-different-credential') {
        if (!triedFacebook) {
          return firebase.auth().signInWithPopup(facebookAuthProvider);
        } else if (triedFacebook) {
          return undefined;// change this to trying email
        }
      }
      return console.log(`Error: ${e}`);
    });
  };
};

export const startLoginFacebook = () => {
  return () => {
    return firebase.auth().signInWithPopup(facebookAuthProvider).catch((e) => {
      if (e.code === 'auth/account-exists-with-different-credential') {
        if (!triedGoogle) {
          return firebase.auth().signInWithPopup(googleAuthProvider);
        } else if (triedGoogle) {
          return undefined;// change this to trying email
        }
      }
      return console.log(`Error: ${e}`);
    });
  };
};


export const creatLoginEmail = (email, password) => {
  return () => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };
};

export const startLoginEmail = (email, password) => {
  return () => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };
};

export const logout = () => ({ type: 'LOGOUT' });

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
