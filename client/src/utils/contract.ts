import Web3, { Address } from 'web3'
import json from './contracts.json'

// // Network settings have more properties, but we're only interested in the `address`
// type NetworkSettings = Record<string, { address: Address }>

// const projectUrl = process.env['NEXT_PUBLIC_PROJECT_URL']
// const networkId = process.env['NEXT_PUBLIC_NETWORK_ID']

// const networkSettings = lotteryJson.networks as NetworkSettings

// const CONTRACT_ABI = lotteryJson.abi as unknown as AbiItem
// const CONTRACT_ADDRESS = networkSettings[networkId ?? 5777].address as Address

const contractAbi = json.abi;
const contractAddress = json.networks[5777].address;

console.log(contractAddress)
console.log(contractAbi)

export const web3 = new Web3("http://localhost:7545")

export const contract = new web3.eth.Contract(
  contractAbi,
  contractAddress,
)


export async function methodForTesting(from: Address) {
    console.log(contract.methods.test().call({ from }))
}
  

