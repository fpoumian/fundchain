import React from 'react'

import Form from 'semantic-ui-react/dist/commonjs/collections/Form'
import Message from 'semantic-ui-react/dist/commonjs/collections/Message'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Input from 'semantic-ui-react/dist/commonjs/elements/Input'

import Layout from 'components/Layout'
import factory from 'ethereum/factory'
import web3 from 'ethereum/web3'
import { Router } from 'routes'

import PropTypes from 'prop-types'

class CampaignNew extends React.Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false,
  }

  onSubmit = async event => {
    event.preventDefault()
    this.setState({
      loading: true,
      errorMessage: '',
    })
    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        })
      Router.push('/')
    } catch (err) {
      this.setState({ errorMessage: err.message.split('\n')[0] })
    }
    this.setState({
      loading: false,
    })
  }

  render() {
    return (
      <Layout>
        <h3>{`Create a Campaign`}</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label htmlFor="">{`Minimum Contribution`}</label>
            <Input
              label={`wei`}
              labelPosition={`right`}
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })}
            />
          </Form.Field>
          <Message error header={`Oops!`} content={this.state.errorMessage} />
          <Button
            loading={this.state.loading}
            type={`submit`}
            primary
          >{`Create!`}</Button>
        </Form>
      </Layout>
    )
  }
}

CampaignNew.propTypes = {}

export default CampaignNew
