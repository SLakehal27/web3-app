pragma solidity ^0.8.13;

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
	}

	struct MovieWithRating {
        string id;
        string title;
        string description;
        uint releaseYear;
        uint averageRating;
        uint rating;
    }

	constructor() {
        addMovie("1", Movie("1", "The Shawshank Redemption", "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", 1994, 10));
        addMovie("2", Movie("2", "The Godfather", "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.", 1972, 9));
        addMovie("3", Movie("3", "The Dark Knight", "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", 2008, 9));
        addMovie("4", Movie("4", "12 Angry Men", "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.", 1957, 8));
        addMovie("5", Movie("5", "Schindler's List", "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.", 1993, 8));
    	addMovie("6", Movie("6", "The Lord of the Rings: The Return of the King", "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.", 2003, 8));
        addMovie("7", Movie("7", "Pulp Fiction", "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", 1994, 8));
        addMovie("8", Movie("8", "The Good, the Bad and the Ugly", "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.", 1966, 8));
        addMovie("9", Movie("9", "Forrest Gump", "The story of a man with a low IQ who accomplished great things in his life.", 1994, 8));
        addMovie("10", Movie("10", "Inception", "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", 2010, 8));
	}

	mapping (address => UserInfo) public wallets;
	address[] addressArray;
	mapping (string => Movie) public movies;
	string[] idArray;


	function addUser(address wallet, string memory username) public {
		for (uint i = 0; i < addressArray.length; i++) {
			if (addressArray[i] == wallet) {
				return;
			}
		}

		wallets[wallet].username = username;
		addressArray.push(wallet);
	}

	function getUsername(address wallet) public view returns(string memory) {
		string memory username = wallets[wallet].username;

		return username;
	}

	function addReview(address wallet, Review memory review) public {
		addUser(wallet, 'default');
		UserInfo storage user = wallets[wallet];

		for (uint i = 0; i < user.reviews.length; i++) {
            if (keccak256(bytes(user.reviews[i].idMovie)) == keccak256(bytes(review.idMovie))) {
                return;
            }
        }

		user.reviews.push(review);
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

	function removeFromWatchlist(address wallet, string memory idMovie) public {
		UserInfo storage user = wallets[wallet];
		for (uint i = 0; i < user.idMoviesToWatch.length; i++) {
			if (keccak256(bytes(user.idMoviesToWatch[i])) == keccak256(bytes(idMovie))) {
				user.idMoviesToWatch[i] = user.idMoviesToWatch[user.idMoviesToWatch.length - 1];
				user.idMoviesToWatch.pop();
				break;
			}
		}
	}

	function getWatchlist(address wallet) public view returns (Movie[] memory) {
		UserInfo memory user = wallets[wallet];
		uint256 watchlistLength = user.idMoviesToWatch.length;
		Movie[] memory watchlist = new Movie[](watchlistLength);
		
		for (uint256 i = 0; i < watchlistLength; i++) {
			watchlist[i] = movies[user.idMoviesToWatch[i]];
		}

    	return watchlist;
	}


    function getReviews(address wallet) public view returns (MovieWithRating[] memory) {
        UserInfo memory user = wallets[wallet];
        MovieWithRating[] memory reviews = new MovieWithRating[](user.reviews.length);

        for (uint256 i = 0; i < user.reviews.length; i++) {
            Review memory review = user.reviews[i];
            Movie memory movie = movies[review.idMovie];
            reviews[i] = MovieWithRating({
                id: movie.id,
                title: movie.title,
                description: movie.description,
                releaseYear: movie.releaseYear,
                averageRating: movie.averageRating,
                rating: review.rating
            });
        }

        return reviews;
    }

	function getReviewsForMovie(string memory movieId) public view returns (Review[] memory) {
		uint256 count = 0;
		for (uint256 i = 0; i < addressArray.length; i++) {
			Review[] memory reviews = wallets[addressArray[i]].reviews;
			for (uint256 j = 0; j < reviews.length; j++) {
				if (keccak256(bytes(movieId)) == keccak256(bytes(reviews[j].idMovie))) {
					count++;
				}
			}
		}

		Review[] memory movieReviews = new Review[](count);
		uint256 index = 0;
		for (uint256 i = 0; i < addressArray.length; i++) {
			Review[] memory reviews = wallets[addressArray[i]].reviews;
			for (uint256 j = 0; j < reviews.length; j++) {
				if (keccak256(bytes(movieId)) == keccak256(bytes(reviews[j].idMovie))) {
					movieReviews[index] = reviews[j];
					index++;
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
		Movie[] memory allMovies = getAllMovies();

		quickSort(allMovies, int(0), int(allMovies.length - 1));

		return allMovies;
	}


	function getAverageRating(string memory idMovie) public view returns(uint) {
		uint averageRating = movies[idMovie].averageRating;

		return averageRating;
	}

	// The functions below are private and are therefore only used within the context of the contract itself

	function calculateRating(string memory id) private {
		Movie storage movie = movies[id];
		Review[] memory reviews = getReviewsForMovie(id);
		uint totalRatings = 0;

		for (uint256 i = 0; i < reviews.length; i++) {
			totalRatings += reviews[i].rating;
		}

		movie.averageRating = totalRatings / reviews.length;
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

	function quickSort(Movie[] memory arr, int left, int right) internal pure {
		int i = left;
		int j = right;
		if (i == j) return;
		uint pivot = arr[uint(left + (right - left) / 2)].averageRating;
		while (i <= j) {
			while (arr[uint(i)].averageRating > pivot) i++;
			while (pivot > arr[uint(j)].averageRating) j--;
			if (i <= j) {
				(arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
				i++;
				j--;
			}
		}
		if (left < j) quickSort(arr, left, j);
		if (i < right) quickSort(arr, i, right);
	}
}
