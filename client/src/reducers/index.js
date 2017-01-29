import { combineReducers } from 'redux'

import user from './user';
import ui from './ui';

const reducer = combineReducers({
  user,
  ui,
})

export default reducer
