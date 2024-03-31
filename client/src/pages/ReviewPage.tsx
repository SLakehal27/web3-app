import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Movie } from "../interfaces/Movie";
import { addToWatchlistFromContract, getMovieFromContract, web3 } from "../utils/contract";
import { Address } from "web3";

export function ReviewPage() {

  const addToWatchlist = async () => {
    if(!id) {
      return;
    }

    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    addToWatchlistFromContract(address, id);
  };

  const [rating, setRating] = useState(5);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }

      setCurrentMovie(await getMovieFromContract(id));
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-24 gap-5">
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
          <Link to="/">
            <Button className="bg-indigo-500 w-48 text-lg hover:bg-indigo-800 hover:scale-110 transition">
              Add rating
            </Button>
          </Link>
          
          <Link to="/">
            <Button onClick={addToWatchlist} className="bg-indigo-500 w-48 text-lg hover:bg-indigo-800 hover:scale-110 transition">
              Add to Watch List
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
