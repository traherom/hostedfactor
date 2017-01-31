import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import ui from './ui';
import codes from './codes';

const reducer = combineReducers({
  user,
  ui,
  codes,
  routing: routerReducer,
});

export default reducer;
