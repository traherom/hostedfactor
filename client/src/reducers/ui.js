const defaultUi = {
  menuOpen: false,
};

const ui = (state = defaultUi, action) => {
  switch (action.type) {
    case 'MENU_OPEN':
      return {
        ...state,
        menuOpen: true,
      }

    case 'MENU_CLOSE':
      return {
        ...state,
        menuOpen: false,
      }

    case 'LOGOUT':
      // Ensure menu closes when user logs out
      return {
        ...state,
        menuOpen: false,
      }

    default:
      return state
  }
}

export default ui
