import React from "react";
import "./App.css";
import { methodForTesting, web3 } from "./utils/contract";
import { Address } from "web3";

function App() {
  return <h1 className="text-emerald-300" onClick={methodForTesting}>Hello world :D</h1>;
}

export default App;
