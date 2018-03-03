import React from 'react'
import PropTypes from 'prop-types'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import { Link } from '../routes'

const Header = props => (
  <Menu style={{ marginTop: '10px' }}>
    <Link route={`/`} prefetch>
      <a className={`item`}>CrowdCoin</a>
    </Link>
    <Menu.Menu position={`right`}>
      <Link route={`/`} prefetch>
        <a className={`item`}>{`Campaigns`}</a>
      </Link>
      <Link route={`/campaigns/new`} prefetch>
        <a className={`item`}>{`+`}</a>
      </Link>
    </Menu.Menu>
  </Menu>
)

Header.propTypes = {}

export default Header
