import Web3, { Address } from 'web3'
import json from './contracts.json'
import { Movie } from '../interfaces/Movie';

const contractAbi = json.abi;
const contractAddress = json.networks[5777].address;

export const web3 = new Web3("http://localhost:7545")

export const contract = new web3.eth.Contract(
  contractAbi,
  contractAddress,
)

export async function getUsernameFromContract(address: Address): Promise<string> {
    return await contract.methods.getUsername(address).call({from: address})
}

export async function addUserFromContract(address: Address, username: string) {
    await contract.methods.addUser(address, username).send({from: address, gas: "200000"})
}

export async function getWatchlistFromContract(address: Address): Promise<Movie[]> {
    return await contract.methods.getWatchlist(address).call({from: address})
}

export async function addToWatchlistFromContract(address: Address, idMovie: string) {
    await contract.methods.addToWatchlist(address, idMovie).send({from: address})
}

export async function removeFromWatchlistFromContract(address: Address, idMovie: string) {
    await contract.methods.removeFromWatchlist(address, idMovie).send({from: address})
}

export async function getReviewsFromContract(address: Address): Promise<Movie[]> {
    return await contract.methods.getReviews(address).call({from: address})
}

export async function addReviewFromContract(address: Address, review: {idMovie: string, rating: number}) {
    await contract.methods.addReview(address, review).send({from: address, gas: "200000"});
}

export async function getReviewsForMovieFromContract(moveId: string) {
    return await contract.methods.getReviewsForMovie(moveId).call()
}

export async function getMovieFromContract(moveId: string): Promise<Movie> {
    return await contract.methods.getMovie(moveId).call()
}

export async function getAllMoviesFromContract(): Promise<Movie[]> {
    return await contract.methods.getAllMovies().call()
}


export async function getTopRatedFromContract(): Promise<Movie[]> {
    return await contract.methods.getTopRated().call()
}

export async function getAverageRatingFromContract(movieId: string) {
    return await contract.methods.getAverageRating(movieId).call()
}

