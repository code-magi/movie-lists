import axios from 'axios'
// import { LOGIN, VAL_ERROR, AUTH_ERROR, CLEAR_ERROR_OBJECTS, LOGOUT } from './types'

// Post data from login and signup. Get user data back. Dispatch user data or errors
export const getListsAction = () => async dispatch => {
  console.log('getListsAction called')

  try {
    let data = await (await (axios({
      method: 'get',
      url: 'api/lists',
      withCredentials: true
    }))).data
    console.log('data from getListsAction', data)
    let { lists } = data
    dispatch({
      type: 'getLists',
      payload: lists
    })
  } catch (error) {
    // console.log('error.response.data on getListsAction', error.response.data)

    console.log('error on loginAction from userReducer:', error)
  }
}

export const editListAction = (list) => dispatch => {
  console.log('editListAction called')

  dispatch({
    type: 'editList',
    payload: list
  })
}

// export const clearErrorObjectsAction = () => dispatch => {
//   console.log('clearErrorObjectsAction called')

//   dispatch({
//     type: CLEAR_ERROR_OBJECTS
//   })
// }
