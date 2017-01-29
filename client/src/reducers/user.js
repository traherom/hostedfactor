export const defaultUserState = {
  name: '',
  encryptionKey: null,
  status: {
    loggingIn: false,
    loggedIn: false,

    usernameMessage: '',
    usernameValue: '',
    passwordMessage: '',
    passwordValue: '',

    generatingKey: false,
    generatingCreds: false,
    percentage: 0,
  },
};

const user = (state = defaultUserState, action) => {
  switch (action.type) {
    case 'SET_USERNAME_VALUE':
      return {
        ...state,
        status: {
          ...state.status,
          usernameValue: action.value,
        },
      };

    case 'SET_PASSWORD_VALUE':
      return {
        ...state,
        status: {
          ...state.status,
          passwordValue: action.value,
        },
      };

    case 'LOGOUT':
      return {
        ...state,
        ...defaultUserState,
      };

    case 'SET_USERNAME_MESSAGE':
      return {
        ...state,
        status: {
          ...state.status,
          usernameMessage: action.message,
        },
      };

    case 'SET_PASSWORD_MESSAGE':
      return {
        ...state,
        status: {
          ...state.status,
          passwordMessage: action.message,
        },
      };

    case 'LOGIN_STARTED':
      return {
        ...state,
        status: {
          ...state.status,
          loggingIn: true,
          loggedIn: false,
        },
      };

    case 'LOGIN_FAILED':
      return {
        ...state,
        status: {
          ...state.status,
          loggingIn: false,
          loggedIn: false,
          passwordValue: '',
        },
      };

    case 'LOGIN_SUCCEEDED':
      return {
        ...state,
        name: action.username,
        status: {
          ...state.status,
          loggingIn: false,
          loggedIn: true,
          passwordValue: '',
        },
      };

    case 'GENERATING_CREDS':
      return {
        ...state,
        status: {
          ...state.status,
          generatingCreds: true,
          percentage: action.percentage,
        },
      };

    case 'DONE_GENERATING_CREDS':
      return {
        ...state,
        status: {
          ...state.status,
          generatingCreds: false,
          percentage: 0,
        },
      };

    case 'GENERATING_KEY':
      return {
        ...state,
        status: {
          ...state.status,
          generatingKey: true,
          percentage: action.percentage,
        },
      };

    case 'DONE_GENERATING_KEY':
      return {
        ...state,
        status: {
          ...state.status,
          generatingKey: false,
          percentage: 0,
        },
      };

    case 'SET_KEY':
      return {
        ...state,
        encryptionKey: action.key,
      };


    default:
      return state;
  }
}

export default user;
