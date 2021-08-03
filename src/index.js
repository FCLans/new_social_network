import store from './redux/reduxStore'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import {Provider} from "react-redux";


const rerenderTree = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>
    , document.getElementById('root'))
}

rerenderTree()

store.subscribe(() => {
  rerenderTree()
})