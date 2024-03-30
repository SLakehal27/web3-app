import React from "react";
import "./App.css";
import { methodForTesting, web3 } from "./utils/contract";
import { Address } from "web3";

function App() {

  const handleClick = async () => {
    console.log(web3)

    const accounts = await web3.eth.requestAccounts()
    const address: Address = accounts[0]

    methodForTesting(address)
  };


  return <h1 className="text-emerald-300" onClick={handleClick}>Hello world :D</h1>;
}

export default App;
