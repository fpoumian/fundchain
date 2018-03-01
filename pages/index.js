import React from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'

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
      <div>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />
        <Card.Group items={items} />
        <Button content={`Create Campaign`} icon={`add circle`} primary />
      </div>
    )
  }
}

export default CampaignIndex
