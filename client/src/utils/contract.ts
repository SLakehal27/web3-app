import Web3, { Address } from 'web3'
import json from './contracts.json'

const contractAbi = json.abi;
const contractAddress = json.networks[5777].address;

console.log(contractAddress)
console.log(contractAbi)

export const web3 = new Web3("http://localhost:7545")

export const contract = new web3.eth.Contract(
  contractAbi,
  contractAddress,
)

export async function getUsernameFromContract(address: Address) {
    console.log(await contract.methods.getUsername(address).call({from: address}))
}

export async function setUsernameFromContract(address: Address, username: string) {
    await contract.methods.saveUser(address, username).send({from: address})
}

