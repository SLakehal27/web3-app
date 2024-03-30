import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-purple-200 p-10">
      <div className="flex justify-between">
        <p>Header Logo</p>
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
