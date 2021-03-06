import React from 'react'
import Card from 'semantic-ui-react/dist/commonjs/views/Card'
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'

import Layout from 'components/Layout'
import createCampaign from 'ethereum/campaign'

import web3 from 'ethereum/web3'
import ContributeForm from 'components/ContributeForm'
import { Link } from 'routes'

class CampaignShow extends React.Component {
  static async getInitialProps({ query: { address } }) {
    const campaign = createCampaign(address)
    const summary = await campaign.methods.getSummary().call()
    return {
      address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    }
  }

  render() {
    const {
      address,
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props
    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money.',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to become an approver.',
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw money from the contract. Requests must by aproved by approvers.',
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description:
          'Number of people who have already donated to this campaign.',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money this campaign has to spend.',
      },
    ]
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Card.Group items={items} />
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`} prefetch>
                <a>
                  <Button primary>{`View Requests`}</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default CampaignShow
