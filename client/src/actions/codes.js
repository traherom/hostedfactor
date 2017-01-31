export function setCodes(codes) {
  return {
    type: 'SET_CODES',
    codes,
  };
}

export function fetchCodes(username, password) {
  return (dispatch, getState) => {
    const state = getState();

    return Promise.resolve()
      .then(() => fetch('/api/v1/code/', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }))
      .then((response) => response.json())
      .then((json) => dispatch(setCodes(json)));
  };
}
