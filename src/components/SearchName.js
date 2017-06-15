import React from 'react'
import { updateAddress, setNodeDetails } from '../updaters/nodes'
import { db } from 'redaxe'
import Blockies from './Blockies'

export default () => {
  let owner = <div>&nbsp;</div>,
      getDetails,
      address = db.get('rootAddress'),
      addressExists = address !== '0x0000000000000000000000000000000000000000'


  if(addressExists) {
    owner = <div className="owner">
      Owner address: {address}
      <Blockies address={address} />
    </div>
  } else if(db.get('rootName').length > 0 ) {
    owner = <div>No owner found</div>
  }
  getDetails = addressExists ? <button className="get-details" onClick={() => setNodeDetails(db.get('rootName'),db.get('rootAddress'))}>Get Details</button> : null

  return <div className="search-name">
    <div className="instructions">Search an ethereum name</div>
    <input type="text" id="address" placeholder="vitalik.eth" onChange={(e) => updateAddress(e.target.value)} />
    {owner}
    {getDetails}
  </div>
}
