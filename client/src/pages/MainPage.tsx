import {
  addReviewFromContract,
  addToWatchlistFromContract,
  getReviewsFromContract,
  getUsernameFromContract,
  getWatchlistFromContract,
  setUsernameFromContract,
  web3,
} from "../utils/contract";
import { Address } from "web3";

export function MainPage() {
  const setUsername = async () => {
    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    setUsernameFromContract(address, "mathieu");
  };

  const getUsername = async () => {
    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    getUsernameFromContract(address);
  };

  const getReviews = async () => {
    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    getReviewsFromContract(address);
  };

  const addReview = async () => {
    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    addReviewFromContract(address, {idMovie: '123', rating: 4});
  };

  const getWatchlist = async () => {
    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    getWatchlistFromContract(address);
  };

  const addToWatchlist = async () => {
    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    addToWatchlistFromContract(address, '123');
  };


  return (
    <>
      <div>
        <h1 className="text-emerald-300" onClick={setUsername}>
          Set the username on the contract
        </h1>

        <h1 className="text-emerald-300" onClick={getUsername}>
          Get the username from contract
        </h1>

        <h1 className="text-emerald-300" onClick={addToWatchlist}>
          Add to watchlist
        </h1>

        <h1 className="text-emerald-300" onClick={getWatchlist}>
          Get the watchlist
        </h1>

        <h1 className="text-emerald-300" onClick={addReview}>
          Add review
        </h1>

        <h1 className="text-emerald-300" onClick={getReviews}>
          Get the reviews
        </h1>
      </div>
    </>
  );
}
