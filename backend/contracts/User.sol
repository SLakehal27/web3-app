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

	mapping (address => UserInfo) public wallets;

	function addUser(address wallet, string memory username) public {
		wallets[wallet].username = username;
	}

	function getUsername(address wallet) public view returns(string memory) {
		string memory username = wallets[wallet].username;

		return username;
	}

	function addReviewToUser(address wallet, Review memory review) public {
		UserInfo storage user = wallets[wallet];

		// use revert instead?
		for (uint i = 0; i < user.reviews.length; i++) {
            if (keccak256(bytes(user.reviews[i].idMovie)) == keccak256(bytes(review.idMovie))) {
                return;
            }
        }

		user.reviews.push(review);

		for (uint i = 0; i < user.idMoviesToWatch.length; i++) {
			if (keccak256(bytes(user.idMoviesToWatch[i])) == keccak256(bytes(review.idMovie))) {
				user.idMoviesToWatch[i] = user.idMoviesToWatch[user.idMoviesToWatch.length - 1];

				user.idMoviesToWatch.pop();
				break;
			}
		}
	}

	function addMovieToWatchlist(address wallet, string memory idMovie) public {
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
}
