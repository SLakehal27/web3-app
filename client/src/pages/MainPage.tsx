import {
  addReviewFromContract,
  addToWatchlistFromContract,
  getAllMoviesFromContract,
  getReviewsFromContract,
  getTopRatedFromContract,
  getUsernameFromContract,
  getWatchlistFromContract,
  setUsernameFromContract,
  web3,
} from "../utils/contract";
import { TopRatedCarousel } from "../components/TopRatedCarousel";
import { Address } from "web3";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { MovieCard } from "../components/MovieCard";
import { Movie } from "../interfaces/Movie";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { watch } from "fs";

export function MainPage() {
  const setUsername = async () => {
    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    setUsernameFromContract(address, "mathieu, is amazing");
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

    addReviewFromContract(address, { idMovie: "123", rating: 4 });
  };

  const getWatchlist = async () => {
    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    getWatchlistFromContract(address);
  };

  const addToWatchlist = async () => {
    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    addToWatchlistFromContract(address, "123");
  };

  const [topRatedMovies, setTopRatedMovies] = useState<Movie[] | null>(null);
  const [watchlist, setWatchlist] = useState<Movie[] | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      setTopRatedMovies(await getTopRatedFromContract());
      
      const accounts = await web3.eth.getAccounts();
      const address: Address = accounts[0];
  
      setWatchlist(await getWatchlistFromContract(address))
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center p-20">
        <h1 className="font-bold text-3xl">Top rated movies!</h1>
        <TopRatedCarousel movies={topRatedMovies} />
        <h1 className="font-bold text-3xl">Movies to watch!</h1>
        <div className="grid grid-cols-5">
          {watchlist?.map((movie, index) => {
            return (
              <div className="flex flex-col items-center">
                <Link to={`review/${movie.id}`} key={index}>
                  <MovieCard movie={movie} />
                </Link>
                <Button className="bg-indigo-500 hover:bg-indigo-800 hover:scale-110 transition">
                  Remove from watch list
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
