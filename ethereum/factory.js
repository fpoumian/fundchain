import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x7e26c7a715C4eabB7AA6BdFb3dA0c0Fa1532AFD6'
)

export default instance