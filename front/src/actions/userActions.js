import axios from 'axios'
import { LOGIN, VAL_ERROR, AUTH_ERROR, CLEAR_ERROR_OBJECTS, LOGOUT } from './types'

// Post data from login and signup. Get user data back. Dispatch user data or errors
export const loginAction = ({ reqBody, url }) => async dispatch => {
  console.log('loginAction called')

  try {
    let data = await (await (axios({
      method: 'post',
      data: reqBody,
      url: url,
      withCredentials: true
    }))).data
    // console.log('data from loginAction', data)

    let { email, userId, avatar } = data
    dispatch({
      type: LOGIN,
      payload: { email, userId, avatar }
    })
  } catch (error) {
    console.log('error.response.data on loginAction', error.response.data)

    // check what type of errors we have. field validation - valErrors{} or auth errors - errors{}
    if (error.response.data.valErrors) {
      // dispatch error to store
      dispatch({
        type: VAL_ERROR,
        payload: error.response.data.valErrors
      })
    } else if (error.response.data.errors) {
      // dispatch error to store
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data.errors
      })
    } else {
      console.log('error on loginAction :', error)
    }
  }
}

export const clearErrorObjectsAction = () => dispatch => {
  console.log('clearErrorObjectsAction called')

  dispatch({
    type: CLEAR_ERROR_OBJECTS
  })
}
