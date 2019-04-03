const initialState = {
  lists: [],
  editList: {}
}

export default (state = initialState, { type, payload }) => {
  // console.log('from userReducer payload ', payload)
  switch (type) {
    case 'getLists':
      console.log('action getLists used')
      return { ...state, lists: payload }

    case 'searchList':
      console.log('action searchList used')
      return {
        ...state,
        searchListQuery: payload
      }

    case 'editList':
      console.log('action editList used')
      return {
        ...state,
        editList: payload
      }

    default:
      return state
  }
}
