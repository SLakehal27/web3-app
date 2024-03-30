import { Movie } from "../interfaces/Movie";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div>
      <Card className="m-10 flex flex-col w-[250px] items-center justify-center hover:scale-110 transition">
        <CardHeader>
          <h1>{movie.title}</h1>
        </CardHeader>
        <CardContent>
          <p>{movie.description}</p>
          <p>Number of ppl</p>
        </CardContent>
        <CardFooter>
          <p>{movie.rating} </p>
        </CardFooter>
      </Card>
    </div>
  );
}
