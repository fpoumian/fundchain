import React from 'react'
import PropTypes from 'prop-types'

import Form from 'semantic-ui-react/dist/commonjs/collections/Form'
import Message from 'semantic-ui-react/dist/commonjs/collections/Message'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Input from 'semantic-ui-react/dist/commonjs/elements/Input'

import Campaign from 'ethereum/campaign'
import web3 from 'ethereum/web3'
import { Router } from '../routes'

class ContributeForm extends React.Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false,
  }

  onSubmit = async event => {
    event.preventDefault()
    const campaign = Campaign(this.props.address)
    this.setState({ loading: true, errorMessage: '' })

    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether'),
      })

      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (err) {
      this.setState({
        errorMessage: err.message.split('\n')[0],
      })
    }
    this.setState({ loading: false, value: '' })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>{`Amount to Contribute`}</label>
          <Input
            label={`ether`}
            labelPosition={`right`}
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
        </Form.Field>
        <Message
        error
        header={`Oops!`}
        content={this.state.errorMessage}
        />
        <Button primary loading={this.state.loading}>{`Contribute!`}</Button>
      </Form>
    )
  }
}

ContributeForm.propTypes = {}

export default ContributeForm
