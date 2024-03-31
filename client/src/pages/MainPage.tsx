import {
  addReviewFromContract,
  addToWatchlistFromContract,
  getAllMoviesFromContract,
  getReviewsFromContract,
  getTopRatedFromContract,
  getUsernameFromContract,
  getWatchlistFromContract,
  removeFromWatchlistFromContract,
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
import { Header } from "../components/Header";

export function MainPage() {
  const removeFromWatchlist = async (id: string) => {
    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    await removeFromWatchlistFromContract(address, id);
    setWatchlist(await getWatchlistFromContract(address))
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
      <Header />
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
                <Button onClick={async () => await removeFromWatchlist(movie.id)} className="bg-indigo-500 hover:bg-indigo-800 hover:scale-110 transition">
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
