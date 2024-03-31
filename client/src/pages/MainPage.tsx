import {
  addReviewFromContract,
  addToWatchlistFromContract,
  getReviewsFromContract,
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

  const mockMovies: Movie[] = [
    {
      id: "1234",
      title: "Oppenheimer",
      description:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      overallRating: 10,
      rating: 9.8,
    },
    {
      id: "5678",
      title: "Spiderman: Into The Spiderverse",
      description:
        "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
      overallRating: 10,
      rating: 9.5,
    },
    {
      id: "1234",
      title: "Oppenheimer",
      description:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      overallRating: 10,      
      rating: 7,
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center p-20">
        <h1 className="font-bold text-3xl">Top rated movies!</h1>
        <TopRatedCarousel movies={mockMovies} />
        <h1 className="font-bold text-3xl">Movies to watch!</h1>
        <div className="grid grid-cols-5">
          {mockMovies.map((movie) => {
            return (
              <Link to={`review/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
