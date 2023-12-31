import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import Home from '../Container/Home'
import Login from '../Container/Login'
import Register from '../Container/register'
import PrivateRoute from './private-routes'

function Rota() {
  return (
    <Router>
      <Routes>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Register />} path="/cadastro"></Route>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default Rota
