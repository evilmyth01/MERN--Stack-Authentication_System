import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Page from './components/Page.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Signup />} />
      <Route path='login' element={<Login />} />
      <Route path='page' element={<Page />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
