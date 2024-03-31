import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Movie } from "../interfaces/Movie";
import { addReviewFromContract, addToWatchlistFromContract, getMovieFromContract, web3 } from "../utils/contract";
import { Address } from "web3";
import { Header } from "../components/Header";

export function ReviewPage() {

  const navigate = useNavigate();

  const addToWatchlist = async () => {
    if(!id) {
      return;
    }

    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    await addToWatchlistFromContract(address, id);
    navigate('/main')
  };

  const addReview = async () => {
    if(!id) {
      return;
    }

    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    await addReviewFromContract(address, { idMovie: id, rating });
    navigate('/main')
  };

  const [rating, setRating] = useState(5);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }

      const movie = await getMovieFromContract(id);

      setCurrentMovie(movie);
      setRating(movie.rating || 1)
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center mt-24 gap-5">
        <p className="text-4xl font-bold">Average rating: {currentMovie?.averageRating.toString()}</p>
        <p className="text-4xl font-bold">{currentMovie?.title}</p>
        <p>{currentMovie?.description}</p>
        <p>{currentMovie?.rating}</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-2 items-center">
          <div>
            <h1>What do you think about this movie?</h1>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={rating}
            onChange={(e) => setRating(e.target.valueAsNumber)}
          />
          <p>{rating}</p>
        </div>
        <div className="flex gap-6 mt-5">
            <Button onClick={addReview} className="bg-indigo-500 w-48 text-lg hover:bg-indigo-800 hover:scale-110 transition">
              Add rating
            </Button>
          
            <Button onClick={addToWatchlist} className="bg-indigo-500 w-48 text-lg hover:bg-indigo-800 hover:scale-110 transition">
              Add to Watch List
            </Button>
        </div>
      </div>
    </div>
  );
}
