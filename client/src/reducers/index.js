import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import ui from './ui';

const reducer = combineReducers({
  user,
  ui,
  routing: routerReducer,
});

export default reducer;
