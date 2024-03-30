// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract User {

	struct Review {
		string mediaName;
		uint rating;
	}

	struct UserInfo {
		string username;
		Review[] reviews;
	}

	mapping (address => UserInfo) public wallets;

	function saveUser(address wallet, string memory username) public {
		wallets[wallet].username = username;
	}

	function getUsername(address wallet) public view returns(string memory) {
		string memory username = wallets[wallet].username;

		return username;
	}
}
