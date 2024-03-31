import { Movie } from "../interfaces/Movie";
import React, { FC } from "react";

export function MovieListPage() {
  const mockMovies: Movie[] = [
    {
      id: "1234",
      title: "Oppenheimer",
      description:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      overallRating: 10,
      rating: 9.8,
    },
    {
      id: "5678",
      title: "Spiderman: Into The Spiderverse",
      description:
        "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
      overallRating: 10,
      rating: 9.5,
    },
    {
      id: "1234",
      title: "Oppenheimer",
      description:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      overallRating: 10,
      rating: 7,
    },
  ];

  return (
    <>
      <TableView data={mockMovies} />
    </>
  );
}

const TableView: FC<{ data: Movie[] }> = ({ data }) => {
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
          {data.map((movie, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={index}
            >
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index}
              </td>
              <td className="py-4 px-6">{movie.title}</td>
              <td className="py-4 px-6">{movie.overallRating}</td>
              <td className="py-4 px-6">{movie.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
