export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        currentUser: action.currentUser,
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
