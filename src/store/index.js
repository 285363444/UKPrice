import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './reducers'

const isDevelopment = process.env.NODE_ENV === 'development'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  return createStore(
    rootReducer,
    isDevelopment ?
    composeEnhancers(applyMiddleware(thunk, logger)) :
    applyMiddleware(thunk)
  )
}