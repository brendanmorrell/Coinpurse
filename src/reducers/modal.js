
export default (state = { modal: false, pushTD: false }, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        ...state,
        modal: action.modal,
      };
    case 'PUSH_TO_DASHBOARD':
      return {
        ...state,
        pushTD: action.pushTD,
      };
    default:
      return state;
  }
};
