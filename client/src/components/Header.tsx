import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Logo from "../assets/media/cinemaApp.png";

export function Header() {
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
        <Link to="/movielist">
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
