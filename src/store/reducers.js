import { combineReducers } from 'redux'

import { 
  LOGIN_SUCCESS, 
  LOGIN_FAIL,
  GET_MESSAGE_LIST,
} from './contants'

const loginReducer = (state={isLogin: false}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      sessionStorage.setItem('isLogin', true)
      return {isLogin: true}
    case LOGIN_FAIL:
      return {isLogin: false}
    default:
      return state
  }
}

const messageReducer = (state={}, action) => {
  switch (action.type) {
    case GET_MESSAGE_LIST:
      return {...action.payload}    
    default:
      return state
  }
}

export default combineReducers({
  login: loginReducer,
  message: messageReducer,
})