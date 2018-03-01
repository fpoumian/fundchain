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
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />
        <h3>{`Open Campaigns`}</h3>
        <Card.Group items={items} />
        <Button content={`Create Campaign`} icon={`add circle`} primary />
      </Layout>
    )
  }
}

export default CampaignIndex
