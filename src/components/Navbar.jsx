
import { CloudSun } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>
        <CloudSun size={30} />
        Weather AI
      </h2>

      <span>Smart Weather Assistant</span>
    </nav>
  );
}

export default Navbar;
