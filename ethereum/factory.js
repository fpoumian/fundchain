import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xCbb8201ba1EE6d9969DAD07d2A5C07B4BdcEFd31'
)

export default instance