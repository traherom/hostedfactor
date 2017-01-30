export const defaultUserState = {
  name: '',
  encryptionKey: null,
  status: {
    loggingIn: false,
    loggedIn: false,
    registering: false,

    usernameMessage: '',
    usernameValue: '',
    passwordMessage: '',
    passwordValue: '',
    password2Message: '',
    password2Value: '',

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

    case 'SET_PASSWORD2_VALUE':
      return {
        ...state,
        status: {
          ...state.status,
          password2Value: action.value,
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

    case 'SET_PASSWORD2_MESSAGE':
      return {
        ...state,
        status: {
          ...state.status,
          password2Message: action.message,
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
          usernameMessage: '',
          passwordValue: '',
          passwordMessage: '',
          password2Value: '',
          password2Message: '',
        },
      };

    case 'REGISTER_STARTED':
      return {
        ...state,
        status: {
          ...state.status,
          loggingIn: false,
          loggedIn: false,
          registering: true,
        },
      };

    case 'REGISTER_FAILED':
      return {
        ...state,
        status: {
          ...state.status,
          loggingIn: false,
          loggedIn: false,
          registering: false,
        },
      };

    case 'REGISTER_SUCCEEDED':
      return {
        ...state,
        name: action.username,
        status: {
          ...state.status,
          loggingIn: false,
          loggedIn: true,
          registering: false,
          usernameMessage: '',
          passwordValue: '',
          passwordMessage: '',
          password2Value: '',
          password2Message: '',
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
