
const initialState = {
  loggedIn: false,
  user: '',
  userId: '',
  avatar: ''
}

export default (state = initialState, { type, payload }) => {
  // console.log('from userReducer payload ', payload)
  switch (type) {
    case 'login':
      console.log('action login used')
      return {
        ...state,
        loggedIn: true,
        user: payload.email,
        userId: payload.userId,
        avatar: payload.avatar }

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
