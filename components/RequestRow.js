import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import PropTypes from 'prop-types'

import Campaign from '../ethereum/campaign'

class RequestRow extends React.Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address)
    const accounts = await web3.eth.getAccounts()
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0],
    })
  }

  onFinalize = async () => {
    const campaign = Campaign(this.props.address)
    const accounts = await web3.eth.getAccounts()
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0],
    })
  }

  render() {
    const {
      id,
      request: { description, value: amount, recipient, approvalCount, complete },
      approversCount,
    } = this.props
    const readyToFinalize = approvalCount > approversCount / 2
    return (
      <Table.Row disabled={complete} positive={readyToFinalize && !complete}>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{description}</Table.Cell>
        <Table.Cell>{web3.utils.fromWei(amount, 'ether')}</Table.Cell>
        <Table.Cell>{recipient}</Table.Cell>
        <Table.Cell>
          {approvalCount}/{approversCount}
        </Table.Cell>
        <Table.Cell>
          {complete ? null : (
            <Button color={`green`} basic onClick={this.onApprove}>
              {`Approve`}
            </Button>
          )}
        </Table.Cell>
        <Table.Cell>
          {
            complete ? null : (
          <Button color={`teal`} basic onClick={this.onFinalize}>
            {`Finalize`}
          </Button>
          )
          }
        </Table.Cell>
      </Table.Row>
    )
  }
}

RequestRow.propTypes = {}

export default RequestRow
