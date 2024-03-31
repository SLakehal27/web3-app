import { Movie } from "../interfaces/Movie";
import React, { FC, useEffect, useState } from "react";
import { getReviewsFromContract, web3 } from "../utils/contract";
import { Address } from "web3";
import { Header } from "../components/Header";

export function MovieListPage() {
  const [reviewedMovies, setReviewedMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {      
      const accounts = await web3.eth.getAccounts();
      const address: Address = accounts[0];
  
      const reviewedMovies = await getReviewsFromContract(address)

      setReviewedMovies(reviewedMovies)
      console.log(reviewedMovies)
    };

    fetchData();
  }, []);


  return (
    <>
      <Header />
      <TableView data={reviewedMovies} />
    </>
  );
}

const TableView: FC<{ data: Movie[] | null }> = ({ data }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Rank
            </th>
            <th scope="col" className="py-3 px-6">
              Title
            </th>
            <th scope="col" className="py-3 px-6">
              Overall Rating
            </th>
            <th scope="col" className="py-3 px-6">
              Rating
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((movie, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={index}
            >
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </td>
              <td className="py-4 px-6">{movie.title}</td>
              <td className="py-4 px-6">{movie.averageRating.toString()}</td>
              <td className="py-4 px-6">{movie.rating.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
