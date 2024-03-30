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

const TableView: FC<{ data: Movie[] }> = ({ data }) =>{
  return(
<table>
  <tbody>
    {data.map(movie => (
    <tr>
    <td>{movie.rank}</td>
    <td>{movie.title}</td>
    <td>{movie.overallRating}</td>
    <td>{movie.rating}</td>
    </tr>
    ))}
  </tbody>
</table>
  )
}

