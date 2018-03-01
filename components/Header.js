import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'

const Header = props => (
  <Menu style={{ marginTop: '10px' }}>
    <Menu.Item>{`CrowdCoin`}</Menu.Item>
    <Menu.Menu position={`right`}>
      <Menu.Item>{`Campaigns`}</Menu.Item>
      <Menu.Item>{`+`}</Menu.Item>
    </Menu.Menu>
  </Menu>
)

Header.propTypes = {}

export default Header
