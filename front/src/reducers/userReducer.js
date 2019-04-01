import { LOGIN, VAL_ERROR, AUTH_ERROR, CLEAR_ERROR_OBJECTS, LOGOUT } from '../actions/types'

const initialState = {
  loggedIn: false,
  user: '',
  userId: '',
  avatar: '',
  authErrors: {},
  valErrors: {}
}

export default (state = initialState, { type, payload }) => {
  // console.log('from userReducer payload ', payload)
  switch (type) {
    case LOGIN:
      console.log('Reduce LOGIN')
      return {
        ...state,
        loggedIn: true,
        user: payload.email,
        userId: payload.userId,
        avatar: payload.avatar }

    case VAL_ERROR:
      console.log('Reduce VAL_ERROR')
      return {
        ...state,
        valErrors: payload }

    case AUTH_ERROR:
      console.log('Reduce AUTH_ERROR')
      return {
        ...state,
        authErrors: payload }

    case CLEAR_ERROR_OBJECTS:
      console.log('Reduce CLEAR_ERROR_OBJECTS')
      return {
        ...state,
        valErrors: {},
        authErrors: {}
      }

    case 'logout':
      if (document.cookie.includes('__sid__')) {
        document.cookie = '__sid__=""'
      // document.location.reload()
      }
      // document.location.reload()
      console.log('action logout used')
      return {
        ...state,
        loggedIn: false,
        user: 'not logged in',
        userId: '',
        avatar: ''
        // TODO: Make lists empty after logout
        // state.lists.lists: [] }
      }
    default:
      return state
  }
}
