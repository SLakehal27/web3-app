import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Logo from "../assets/media/cinemaApp.png";
import { useEffect, useState } from "react";
import { getUsernameFromContract, web3 } from "../utils/contract";
import { Address } from "web3";

export function Header() {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {      
      const accounts = await web3.eth.getAccounts();
      const address: Address = accounts[0];
  
      setUsername(await getUsernameFromContract(address))
    };

    fetchData();
  }, []);

  return (
    <header className="bg-purple-200">
      <div className="flex justify-between items-center p-2">
        <Link to="/main">
          <img
            src={Logo}
            alt="logo"
            className="h-[100px] hover:scale-110 transition"
          />
        </Link>

        <p className="text-4xl font-bold"> Welcome {username}!</p>

        <Link to="/main/movielist">
          <Button
            className="bg-indigo-500 hover:bg-indigo-800 hover:scale-110 transition mr-5"
            variant={"default"}
          >
            My Movie List
          </Button>
        </Link>
      </div>
    </header>
  );
}
