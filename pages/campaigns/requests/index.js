import React from 'react'
import { Button } from 'semantic-ui-react'

import Layout from '../../../components/Layout'
import { Link } from '../../../routes'
import Campaign from '../../../ethereum/campaign'

class RequestIndex extends React.Component {
  static async getInitialProps({ query: { address } }) {
    const campaign = Campaign(address)
    const requestCount = await campaign.methods.getRequestsCount().call()

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => campaign.methods.requests(index).call())
    )

    return { address, requests, requestCount }
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
