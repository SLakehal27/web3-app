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
            <div className="p-1">
              <MovieCard movie={movie} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
