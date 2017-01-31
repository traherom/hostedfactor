const defaultCodes = {
  codes: [],
};

const codes = (state = defaultCodes, action) => {
  switch (action.type) {
    case 'LOGOUT':
      // Clear all codes when user leaves
      return {
        ...state,
        defaultCodes,
      }

    default:
      return state;
  }
}

export default codes;
