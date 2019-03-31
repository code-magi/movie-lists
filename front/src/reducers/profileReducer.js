
const initialState = {
  profile: null,
  isProfileLoaded: false
}

export default (state = initialState, { type, payload }) => {
  // console.log('from userReducer payload ', payload)
  switch (type) {
    case 'get-user-profile':
      console.log('Reduce Get-User-Profile')
      return {
        ...state,
        profile: payload,
        isProfileLoaded: true
      }

    default:
      return state
  }
}
