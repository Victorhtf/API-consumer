import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Globals.css'


// Redux
import { Provider } from 'react-redux'
import store from './features/redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
       <App />
    </Provider>
  </React.StrictMode>
)
