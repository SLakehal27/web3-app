import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Logo from "../assets/media/cinemaApp.png";

export function Header() {
  return (
    <header className="bg-purple-200 p-10">
      <div className="flex justify-between items-center">
        <img src={Logo} style= {{height:"150px"}}/> 
        <Link to="/movielist">
          <Button
            className="bg-indigo-500 hover:bg-indigo-800 hover:scale-110 transition"
            variant={"default"}
          >
            My Movie List
          </Button>
        </Link>
      </div>
    </header>
  );
}
