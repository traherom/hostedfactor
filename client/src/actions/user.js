export function setUser(user) {
  return {
    type: 'SET_USER',
    user: user,
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export function performLogin(username, password) {
  return (dispatch) => {
    return Promise.resolve(dispatch(setUser({
      name: username,
    })));
  }
}
