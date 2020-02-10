import 'babel-polyfill'
import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '.././store/configureStore'
import App from '../shared/App'
import { BrowserRouter } from 'react-router-dom'

let initStoreData
if (__isBrowser__) {
    initStoreData = window.__INITIAL_DATA__
    delete window.__INITIAL_DATA__
} else { //if SERVER (renderToString), сюда придет все что мы положим в переменную 'context', как staticContext
    // /initStoreData = this.props.staticContext.initStoreData
}

const store = configureStore(initStoreData)

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
