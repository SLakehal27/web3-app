// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;
// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract Movies {

	struct Movie {
		uint id;
		string name;
		string description;
		uint releaseYear;
		uint averageRating;
		uint numberOfRaitings;
	}

	mapping (uint => Movie) public movies;
	uint moviesLenght;


	function getMovie(uint id) public view returns(Movie memory) {
		return movies[id];
	}

	function getAllMovies() public view returns(Movie[] memory) {
		Movie[] memory allMovies = new Movie[](moviesLenght);
        for (uint256 i = 0; i < moviesLenght; i++) {
            allMovies[i] = movies[i];
        }
		return allMovies;
	}

	function getTopRated() public view returns(Movie[] memory){
		Movie[] memory topRated;
		uint totalRatings;
        for (uint256 i = 0; i < moviesLenght; i++) {
            totalRatings += movies[i].averageRating;
        }
		totalRatings /=	moviesLenght;
		for (uint256 i = 0; i < moviesLenght; i++) {
            if(totalRatings < movies[i].averageRating){
				topRated[i] = movies[i];
			}
        }
		return topRated;
	}

	function addMovie(uint id, Movie memory movie) public {
		movies[id] = movie;
		moviesLenght++;
	}

	function deleteMovie(uint id) public {
		delete(movies[id]);
		moviesLenght--;
	}
}
