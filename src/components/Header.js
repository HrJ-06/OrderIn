import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import contextAPI from "../utils/contextAPI";
import { useSelector } from "react-redux";
const Header = () => {
  const cart = useSelector((store) => store.cart.items);

  const online = useOnlineStatus();
  const [logbtn, setLogbtn] = useState("Login");
  const { loggedUser } = useContext(contextAPI);
  return (
    <div className="flex space justify-between align items-center bg-[#8f4921]">
      <img className="logo" src={require("/logo.png")} alt="Logo" />
      <ul className="flex gap-16 mr-3">
        <li className="text-xl font-semibold font-mono">
          Online Status: {online ? "🟢" : "🔴"}
        </li>
        <li className="text-xl font-semibold font-mono">
          <Link to="/">Home</Link>
        </li>
        <li className="text-xl font-semibold font-mono">
          <Link to="/About">About Us</Link>
        </li>
        <li className="text-xl font-semibold font-mono">
          <Link to="/Grocery">Grocery</Link>
        </li>
        <li className="text-xl font-semibold font-mono">
          <Link to="/Contact">Contact Us</Link>
        </li>
        <li className="text-xl font-semibold font-mono">
          <Link to="/Cart">Cart({cart.length})</Link>
        </li>
        <li>
          <div>
            <div className="text-lg font-semibold">{loggedUser}</div>
            <button
              className="text-xl font-semibold bg-amber-900 h-10 w-16 font-mono rounded-md"
              onClick={() => {
                logbtn === "Login" ? setLogbtn("Logout") : setLogbtn("Login");
              }}
            >
              {logbtn}
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Header;
