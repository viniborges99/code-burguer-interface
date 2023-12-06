import { Route, Navigate } from 'react-router-dom'

import PropTypes from 'prop-types'

function PrivateRoute({ element, children, ...rest }) {
  const user = localStorage.getItem('codeburger:userData')

  if (!user) {
    return <Navigate to="/login" />
  }
  ;<Route {...rest} component={element} />

  return children
}

export default PrivateRoute

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
}
