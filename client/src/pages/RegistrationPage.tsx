import { Button } from "../components/ui/button";
import Logo from "../assets/media/cinemaApp.png";
import { useState } from "react";
import { Address } from "web3";
import { addUserFromContract, web3 } from "../utils/contract";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');

  const addUser = async () => {
    const accounts = await web3.eth.getAccounts();
    const address: Address = accounts[0];

    await addUserFromContract(address, username);
    navigate('/main')
  };

  return (
    <div className="flex flex-col justify-center items-center mt-16 gap-6">
      <img src={Logo} alt="logo" className="h-[300px]" />
      <div className="flex flex-col gap-6">
        <h1 className="text-5xl font-bold">Popcorn Picks</h1>
        <p className="text-2xl">Enter your username</p>
        <input className="border-2 border-black rounded-md" type="text" onChange={(e) => setUsername(e.target.value)}></input>
        <Button onClick={addUser} className="bg-indigo-500 hover:bg-indigo-800 hover:scale-110 transition">
          Submit username
        </Button>
      </div>
    </div>
  );
}
