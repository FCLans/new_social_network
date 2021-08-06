import store from './redux/reduxStore'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
