import { Link } from "react-router-dom";
import { Movie } from "../interfaces/Movie";
import { MovieCard } from "./MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export function TopRatedCarousel({ movies }: { movies: Movie[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: "auto",
      }}
      className="w-full max-w-xxl"
    >
      <CarouselContent>
        {movies.map((movie: Movie, index: number) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <Link to={`review/${movie.id}`}>
              <div className="p-1">
                <MovieCard movie={movie} />
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
