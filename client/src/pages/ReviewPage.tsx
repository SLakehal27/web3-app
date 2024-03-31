import { useState } from "react";
import { Button } from "../components/ui/button";

export function ReviewPage() {
  const [rating, setRating] = useState(5);
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-36">
        <p>Movie Title</p>
        <p>Description</p>
        <p>Rating</p>
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
