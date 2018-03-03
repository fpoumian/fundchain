import React from 'react'
import { Button, Table } from 'semantic-ui-react'

import Layout from 'components/Layout'
import { Link } from 'routes'
import Campaign from 'ethereum/campaign'
import RequestRow from "components/RequestRow";

class RequestIndex extends React.Component {
  static async getInitialProps({ query: { address } }) {
    const campaign = Campaign(address)
    const requestCount = await campaign.methods.getRequestsCount().call()
    const approversCount = await campaign.methods.approversCount().call()

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => campaign.methods.requests(index).call())
    )

    return { address, requests, requestCount, approversCount }
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table
    return (
      <Layout>
        <h3>{`Requests`}</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated={`right`} style={{marginBottom: 10}}>{`Add Request`}</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>{`ID`}</HeaderCell>
              <HeaderCell>{`Description`}</HeaderCell>
              <HeaderCell>{`Amount`}</HeaderCell>
              <HeaderCell>{`Recipient`}</HeaderCell>
              <HeaderCell>{`Approval Count`}</HeaderCell>
              <HeaderCell>{`Approve`}</HeaderCell>
              <HeaderCell>{`Finalize`}</HeaderCell>
            </Row>
          </Header>
          <Body>
          {
            this.props.requests.map((request, index) => (
              <RequestRow
                request={request}
                approversCount={this.props.approversCount}
                key={index}
                id={index}
                address={this.props.address}
              />
            ))
          }
          </Body>
        </Table>
        <div>{`Found ${this.props.requestCount} requests.`} </div>
      </Layout>
    )
  }
}

export default RequestIndex
