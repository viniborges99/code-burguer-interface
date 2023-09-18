import React from 'react'
import { Route, Navigate } from 'react-router-dom'

import PropTypes from 'prop-types'

function PrivateRoute({ component, ...rest }) {
  const user = localStorage.getItem('codeburger:userData')

  if (!user) {
    return <Navigate to="/login" />
  }
  return <Route {...rest} component={component} />
}

export default PrivateRoute

PrivateRoute.propType = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
}
