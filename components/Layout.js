import React from 'react'
import Container from 'semantic-ui-react/dist/commonjs/elements/Container'
import Head from 'next/head'

import PropTypes from 'prop-types'
import Header from './Header'

const Layout = ({ children }) => (
  <Container>
    <Head>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
      />
    </Head>
    <Header />
    {children}
  </Container>
)

Layout.propTypes = {}

export default Layout
