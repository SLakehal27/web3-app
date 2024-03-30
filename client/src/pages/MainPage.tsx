import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import {
  addReviewFromContract,
  addToWatchlistFromContract,
  getReviewsFromContract,
  getUsernameFromContract,
  getWatchlistFromContract,
  setUsernameFromContract,
  web3,
} from "../utils/contract";
import { Address } from "web3";

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

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: "auto",
        }}
        className="w-full max-w-sm m-12"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div>
        <h1 className="text-emerald-300" onClick={setUsername}>
          Set the username on the contract
        </h1>

        <h1 className="text-emerald-300" onClick={getUsername}>
          Get the username from contract
        </h1>

        <h1 className="text-emerald-300" onClick={addToWatchlist}>
          Add to watchlist
        </h1>

        <h1 className="text-emerald-300" onClick={getWatchlist}>
          Get the watchlist
        </h1>

        <h1 className="text-emerald-300" onClick={addReview}>
          Add review
        </h1>

        <h1 className="text-emerald-300" onClick={getReviews}>
          Get the reviews
        </h1>
      </div>
    </>
  );
}
