const initialState = {
  authUser: null,
  isLoggedIn: false,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, authUser: action.token, isLoggedIn: true};
    case 'LOGOUT':
      return {...state, authUser: null, isLoggedIn: false};
    default:
      return state;
  }
};
