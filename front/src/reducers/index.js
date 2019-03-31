import { combineReducers } from 'redux'

import userReducer from './userReducer.js'
import listsReducer from './listsReducer'
import profileReducer from './profileReducer'

export default combineReducers({
  user: userReducer,
  lists: listsReducer,
  profile: profileReducer
})
