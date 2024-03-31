import { Movie } from "../interfaces/Movie";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div>
      <Card className="m-10 flex flex-col w-[250px] items-center justify-between hover:scale-110 transition h-[350px]">
        <CardHeader className="font-bold text-xl text-center">
          <h1>{movie.title}</h1>
        </CardHeader>
        <CardContent className="overflow-y-auto text-center">
          <p>{movie.description}</p>
        </CardContent>
        <CardFooter>
          <p>{movie.rating} </p>
        </CardFooter>
      </Card>
    </div>
  );
}
