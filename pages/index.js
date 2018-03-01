import React from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'

import Layout from '../components/Layout'

class CampaignIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    return { campaigns }
  }

  render() {
    const items = this.props.campaigns.map(address => ({
      header: address,
      description: <a>View Campaign</a>,
      fluid: true,
    }))
    return (
      <Layout>
        <h3>{`Open Campaigns`}</h3>
        <Button floated={`right`} content={`Create Campaign`} icon={`add circle`} primary />
        <Card.Group items={items} />
      </Layout>
    )
  }
}

export default CampaignIndex
