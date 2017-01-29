export const defaultUserState = {
  name: '',
};

const user = (state = defaultUserState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.user,
      }
    case 'LOGOUT':
      return {
        ...state,
        ...defaultUserState,
      }
    default:
      return state
  }
}

export default user
