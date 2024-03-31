// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract User {
	struct Review {
		string idMovie;
		uint rating;
	}

	struct UserInfo {
		string username;
		Review[] reviews;
		string[] idMoviesToWatch;
	}

	struct Movie {
		string id;
		string title;
		string description;
		uint releaseYear;
		uint averageRating;
		uint numberOfRatings;
	}

	mapping (address => UserInfo) public wallets;
	address[] addressArray;
	mapping (string => Movie) public movies;
	string[] idArray;


	function addUser(address wallet, string memory username) public { // modifié
		wallets[wallet].username = username;
		addressArray.push(wallet);
	}

	function getUsername(address wallet) public view returns(string memory) {
		string memory username = wallets[wallet].username;

		return username;
	}

	function addReview(address wallet, Review memory review) public {
		UserInfo storage user = wallets[wallet];

		// use revert instead?
		for (uint i = 0; i < user.reviews.length; i++) {
            if (keccak256(bytes(user.reviews[i].idMovie)) == keccak256(bytes(review.idMovie))) {
                return;
            }
        }

		user.reviews.push(review);
		movies[review.idMovie].numberOfRatings++;
		calculateRating(review.idMovie);

		for (uint i = 0; i < user.idMoviesToWatch.length; i++) {
			if (keccak256(bytes(user.idMoviesToWatch[i])) == keccak256(bytes(review.idMovie))) {
				user.idMoviesToWatch[i] = user.idMoviesToWatch[user.idMoviesToWatch.length - 1];

				user.idMoviesToWatch.pop();
				break;
			}
		}
	}

	function addToWatchlist(address wallet, string memory idMovie) public {
		UserInfo storage user = wallets[wallet];
        
        for (uint i = 0; i < user.reviews.length; i++) {
            if (keccak256(bytes(user.reviews[i].idMovie)) == keccak256(bytes(idMovie))) {
                return;
            }
        }
        
        for (uint i = 0; i < user.idMoviesToWatch.length; i++) {
            if (keccak256(bytes(user.idMoviesToWatch[i])) == keccak256(bytes(idMovie))) {
                return;
            }
        }

        user.idMoviesToWatch.push(idMovie);
	}

	function getWatchlist(address wallet) public view returns(string[] memory) {
		string[] memory watchlist = wallets[wallet].idMoviesToWatch;

		return watchlist;
	}

	function getReviews(address wallet) public view returns(Review[] memory) {
		Review[] memory reviews = wallets[wallet].reviews;

		return reviews;
	}

	function getReviewsForMovie(string memory movieId) public view returns(Review[] memory) {
		Review[] memory movieReviews;
        for (uint256 i = 0; i < addressArray.length; i++) {
			Review[] memory reviews = wallets[addressArray[i]].reviews;
			for (uint256 j = 0; j < addressArray.length; j++) {
				if (keccak256(bytes(movieId)) == keccak256(bytes(reviews[j].idMovie))) {

					movieReviews[movieReviews.length - 1] = reviews[j];
				}
			}
        }
		return movieReviews;
	}

	function getMovie(string memory id) public view returns(Movie memory) {
		return movies[id];
	}

	function getAllMovies() public view returns(Movie[] memory) {
		Movie[] memory allMovies = new Movie[](idArray.length);
        for (uint256 i = 0; i < idArray.length; i++) {
            allMovies[i] = movies[idArray[i]];
        }
		return allMovies;
	}

	function getTopRated() public view returns(Movie[] memory){
		Movie[] memory topRated;
		uint totalRatings;
        for (uint256 i = 0; i < idArray.length; i++) {
            totalRatings += movies[idArray[i]].averageRating;
        }
		totalRatings /=	idArray.length;
		for (uint256 i = 0; i < idArray.length; i++) {
            if(totalRatings < movies[idArray[i]].averageRating){
				topRated[i] = movies[idArray[i]];
			}
        }
		return topRated;
	}

	function getAverageRating(string memory idMovie) public view returns(uint) {
		uint averageRating = movies[idMovie].averageRating;

		return averageRating;
	}

	// The functions below are private and are therefore only used within the context of the contract itself

	function calculateRating(string memory id) private view {
		Movie memory movie = movies[id];
		Review[] memory reviews = getReviewsForMovie(id);
		uint movieRatings;

		for (uint256 i = 0; i < reviews.length; i++) {
            movieRatings += reviews[i].rating;
        }

		movie.averageRating = movieRatings / reviews.length;
	}

	function addMovie(string memory id, Movie memory movie) private {
		movies[id] = movie;
		idArray.push(id);
	}

	function deleteMovie(string memory id) private {
		delete(movies[id]);
		    for (uint i = 0; i < idArray.length; i++) {
				if (keccak256(bytes(idArray[i])) == keccak256(bytes(id))) {
					idArray[i] = idArray[idArray.length - 1];
					idArray.pop();
					break;
            }
        }
	}
}
