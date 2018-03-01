import React from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'

import Layout from '../components/Layout'
import { Link } from '../routes'

class CampaignIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    return { campaigns }
  }

  render() {
    const items = this.props.campaigns.map(address => ({
      header: address,
      description: (
        <Link route={`/campaigns/${address}`}>
          <a>{`View Campaign`}</a>
        </Link>
      ),
      fluid: true,
    }))
    return (
      <Layout>
        <h3>{`Open Campaigns`}</h3>
        <Link route={`/campaigns/new`}>
          <a>
            <Button
              floated={`right`}
              content={`Create Campaign`}
              icon={`add circle`}
              primary
            />
          </a>
        </Link>
        <Card.Group items={items} />
      </Layout>
    )
  }
}

export default CampaignIndex
