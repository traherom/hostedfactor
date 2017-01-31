import { browserHistory } from 'react-router';

var scrypt = require('scrypt-async');

export function setUser(user) {
  return {
    type: 'SET_USER',
    user: user,
  };
}

export function setUsernameValue(value) {
  return {
    type: 'SET_USERNAME_VALUE',
    value,
  };
}

export function setPasswordValue(value) {
  return {
    type: 'SET_PASSWORD_VALUE',
    value,
  };
}

export function setPassword2Value(value) {
  return {
    type: 'SET_PASSWORD2_VALUE',
    value,
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export function loginStarted() {
  return {
    type: 'LOGIN_STARTED',
  };
}

export function registrationStarted() {
  return {
    type: 'REGISTER_STARTED',
  };
}

export function setUsernameMessage(message = '') {
  return {
    type: 'SET_USERNAME_MESSAGE',
    message,
  };
}

export function setPasswordMessage(message = '') {
  return {
    type: 'SET_PASSWORD_MESSAGE',
    message,
  };
}

export function setPassword2Message(message = '') {
  return {
    type: 'SET_PASSWORD2_MESSAGE',
    message,
  };
}

export function loginFailed() {
  return {
    type: 'LOGIN_FAILED',
  };
}

export function loginSucceeded(username) {
  return {
    type: 'LOGIN_SUCCEEDED',
    username,
  };
}

export function registrationFailed() {
  return {
    type: 'REGISTER_FAILED',
  };
}

export function registrationSucceeded(username) {
  return {
    type: 'REGISTER_SUCCEEDED',
    username,
  };
}

export function generatingCreds(percentage) {
  return {
    type: 'GENERATING_CREDS',
    percentage,
  };
}

export function generatingKey(percentage) {
  return {
    type: 'GENERATING_KEY',
    percentage,
  };
}

export function doneGeneratingCreds() {
  return {
    type: 'DONE_GENERATING_CREDS',
  };
}

export function doneGeneratingKey() {
  return {
    type: 'DONE_GENERATING_KEY',
  };
}

export function setEncryptionKey(key) {
  return {
    type: 'SET_KEY',
    key,
  };
}

export function performLogin(username, password) {
  return (dispatch) => {
    let checkCreds = null;
    let encryptionCreds = null;

    return Promise.resolve()
      .then(() => dispatch(loginStarted()))
      .then(() => dispatch(generatingCreds(0)))
      .then(() => scryptPromise(password, username))
      .then((pw) => checkCreds = pw)
      .then(() => dispatch(doneGeneratingCreds()))
      .then(() => fetch('/api/v1/users/authenticate/', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          user: username,
          credentials: checkCreds,
        }),
      }))
      .then(() => dispatch(loginSucceeded(username)))
      .then(() => dispatch(generatingKey(0)))
      .then(() => scryptPromise(password + password, username))
      .then((pw) => encryptionCreds = pw)
      .then(() => dispatch(doneGeneratingKey()))
      .then(() => dispatch(setEncryptionKey(encryptionCreds)))
      .then(() => browserHistory.push('/code'));
  };
}

export function performRegister(username, password) {
  return (dispatch) => {
    let checkCreds = null;
    let encryptionCreds = null;

    return Promise.resolve()
      .then(() => dispatch(registrationStarted()))
      .then(() => dispatch(generatingCreds(0)))
      .then(() => scryptPromise(password, username))
      .then((pw) => checkCreds = pw)
      .then(() => dispatch(doneGeneratingCreds()))
      .then(() => fetch('/api/v1/users/register/', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          user: username,
          credentials: checkCreds,
        }),
      }))
      .then(() => dispatch(registrationSucceeded(username)))
      .then(() => dispatch(generatingKey(0)))
      .then(() => scryptPromise(password + password, username))
      .then((pw) => encryptionCreds = pw)
      .then(() => dispatch(doneGeneratingKey()))
      .then(() => dispatch(setEncryptionKey(encryptionCreds)))
      .then(() => browserHistory.push('/code'));
  };
}

function scryptPromise(password, salt) {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, {
      N: 16384,
      r: 8,
      p: 1,
      dkLen: 64,
      encoding: 'hex'
    }, (derivedKey) => {
      resolve(derivedKey);
    });
  });
}
