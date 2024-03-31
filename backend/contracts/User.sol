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

	constructor(){
        addMovie("1", Movie("1", "The Shawshank Redemption", "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", 1994, 9, 2201412));
        addMovie("2", Movie("2", "The Godfather", "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.", 1972, 9, 1533255));
        addMovie("3", Movie("3", "The Dark Knight", "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", 2008, 9, 2199641));
        addMovie("4", Movie("4", "12 Angry Men", "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.", 1957, 8, 704034));
        addMovie("5", Movie("5", "Schindler's List", "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.", 1993, 8, 1239929));
    	addMovie("6", Movie("6", "The Lord of the Rings: The Return of the King", "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.", 2003, 8, 1710659));
        addMovie("7", Movie("7", "Pulp Fiction", "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", 1994, 8, 1895566));
        addMovie("8", Movie("8", "The Good, the Bad and the Ugly", "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.", 1966, 8, 732864));
        addMovie("9", Movie("9", "Forrest Gump", "The story of a man with a low IQ who accomplished great things in his life.", 1994, 8, 1671306));
        addMovie("10", Movie("10", "Inception", "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", 2010, 8, 2005113));
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
