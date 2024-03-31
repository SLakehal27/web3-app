import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useParams } from "react-router-dom";
import { Movie } from "../interfaces/Movie";
import { getMovieFromContract } from "../utils/contract";

export function ReviewPage() {
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
      <div className="flex flex-col justify-center items-center mt-36">
        <p>{currentMovie?.title}</p>
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
        <div className="flex flex-col gap-3">
          <Button className="bg-indigo-500 hover:bg-indigo-800 hover:scale-110 transition">
            Add rating
          </Button>

          <Button className="bg-indigo-500 hover:bg-indigo-800 hover:scale-110 transition">
            Add to Watch List
          </Button>
        </div>
      </div>
    </div>
  );
}
