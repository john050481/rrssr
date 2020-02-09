import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension�s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const middlewares = [];
middlewares.push(thunkMiddleware);

if (process.env.NODE_ENV === `development`) {
  const { createLogger } = require(`redux-logger`);
  const loggerMiddleware = createLogger()
  middlewares.push(loggerMiddleware);
}

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
}
