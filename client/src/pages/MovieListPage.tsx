import { Movie } from "../interfaces/Movie";
import React, { FC } from 'react';

export function MovieListPage() {
  const mockMovies: Movie[] = [
    {
      id: "1234",
      rank: 1,
      title: "Oppenheimer",
      description:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      overallRating: 10,
      rating: 9.8,
    },
    {
      id: "5678",
      rank:2,
      title: "Spiderman: Into The Spiderverse",
      description:
        "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
      overallRating: 10,
      rating: 9.5,
    },
    {
      id: "1234",
      rank: 3,
      title: "Oppenheimer",
      description:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      overallRating: 10,      
      rating: 7,
    },
  ];
  
  return (
    <>
      <TableView data={mockMovies}/>
    </>
  );
}

const TableView: FC<{ data: Movie[] }> = ({ data }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Rank
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Overall Rating
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Rating
          </th>
        </tr>
      </thead>
      <tbody className={`bg-white divide-y divide-gray-200`}>
        {data.map((movie, index) => (
          <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{movie.rank}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.overallRating}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
