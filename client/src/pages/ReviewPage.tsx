import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useParams } from "react-router-dom";
import { Movie } from "../interfaces/Movie";

export function ReviewPage() {
  const [rating, setRating] = useState(5);
  const { id } = useParams();
  
  let currentMovie: Movie = {id: '0', title: '', description: '', rating: 0, overallRating: 0};

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-36">
        <p>{currentMovie.title}</p>
        <p>{currentMovie.description}</p>
        <p>{currentMovie.rating}</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-2 items-center">
          <input
            type="range"
            min={1}
            max={10}
            value={rating}
            onChange={(e) => setRating(e.target.valueAsNumber)}
          />
          <p>{rating}</p>
        </div>
        <Button className="bg-indigo-500 hover:bg-indigo-800 hover:scale-110 transition">
          Add rating
        </Button>

        <Button className="bg-indigo-500 hover:bg-indigo-800 hover:scale-110 transition">
          Add to Watch List
        </Button>
      </div>
    </div>
  );
}
