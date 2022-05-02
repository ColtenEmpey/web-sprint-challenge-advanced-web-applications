// 👉 DO NOT CHANGE THIS FILE 👈
// 👉 DO NOT CHANGE THIS FILE 👈
// 👉 DO NOT CHANGE THIS FILE 👈
import React from 'react'
// import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import './styles/reset.css'
import './styles/styles.css'
import ReactDOM from "react-dom/client"

const root = ReactDOM.createRoot( document.getElementById('root'))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  )
