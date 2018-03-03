import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xF0a100b6540E716E4d0AeFeE06Ac17C233AF9dCA'
)

export default instance