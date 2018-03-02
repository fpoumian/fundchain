import React from 'react'
import { Button } from 'semantic-ui-react'

import Layout from '../../../components/Layout'
import { Link } from '../../../routes'

class RequestIndex extends React.Component {
  static getInitialProps({ query: { address } }) {
    return { address }
  }

  render() {
    return (
      <Layout>
        <h3>{`Request List`}</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>{`Add Request`}</Button>
          </a>
        </Link>
      </Layout>
    )
  }
}

export default RequestIndex
