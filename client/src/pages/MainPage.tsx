import {
  getUsernameFromContract,
  setUsernameFromContract,
  web3,
} from "../utils/contract";
import { Address } from "web3";

export function MainPage() {
  const setUsername = async () => {
    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    setUsernameFromContract(address, "mathieu");
  };

  const getUsername = async () => {
    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    getUsernameFromContract(address);
  };
  return (
    <>
      <div>
        <h1 className="text-emerald-300" onClick={setUsername}>
          Set the username on the contract
        </h1>

        <h1 className="text-emerald-300" onClick={getUsername}>
          Get the username from contract
        </h1>
      </div>
    </>
  );
}
