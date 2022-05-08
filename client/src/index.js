import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './features'

import App from './components/App'
import 'materialize-css/dist/css/materialize.min.css'

const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
