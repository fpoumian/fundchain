import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'

const Layout = ({ children }) => (
  <div>
    <Header />
    {children}
    <h1>Im a footer</h1>
  </div>
)

Layout.propTypes = {}

export default Layout
