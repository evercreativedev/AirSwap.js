const _ = require('lodash')
const fs = require('fs')
const { abi } = require('@airswap/light/build/contracts/Light.json')
const constants = require('@airswap/light/deploys.json')

const overwrites = [
  {
    inputs: [
      {
        name: 'nonce',
      },
    ],
    name: 'signerMinimumNonce',
  },
]

const newAbi = _.map(abi, abiItem => {
  const overwriteItem = _.find(overwrites, o => o.name === abiItem.name)
  const newItem = _.merge(abiItem, overwriteItem)

  return newItem
})

fs.writeFileSync(`abis/swapLight.json`, JSON.stringify(newAbi, null, 2))

module.exports = constants
