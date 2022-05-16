import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import { authReducer, cartReducer } from './features'

import App from './components/App'

const axios = require('axios')
window.axios = axios

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>, document.getElementById('root')
);
