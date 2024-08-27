import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import contextAPI from "../utils/contextAPI";
import { useSelector } from "react-redux";
import { useContext } from "react";
import contextAPI from "../utils/contextAPI";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

const Header = () => {
  const cart = useSelector((store) => store.cart.items);
  const online = useOnlineStatus();
  const { loggedUser, login, setLogin } = useContext(contextAPI);

  const handleOnClick = () => {
    Store.addNotification({
      title: "Logged Out Successfully",
      container: "bottom-right",
      type: "success",
      insert: "top",

      dismiss: {
        duration: 1000,
      },
    });
  };

  const logg = () => {
    return login ? "Logout" : "Login";
  };
  return (
    <div className="flex space justify-between align items-center bg-[#8f4921] sticky z-10 top-0 p-1 h-32">
      <img className="rounded-3xl" src={require("/logo.png")} alt="Logo" />
      <ul className="flex gap-16 mr-3">
        <li className="text-[22px] font-bold hover:text-slate-300">
          <Link to="/">Home</Link>
        </li>
        <li className="text-[22px] font-bold   hover:text-slate-300">
          <Link to="/about">About Me</Link>
        </li>
        <li className="text-[22px]  font-bold  hover:text-slate-300">
          <Link to="/contact">Contact Me</Link>
        </li>
        <li className="text-[22px]  font-bold  hover:text-slate-300">
          <Link to="/cart">Cart({cart.length})</Link>
        </li>
        <li className="text-[22px] font-bold ">
          Online Status: {online ? "🟢" : "🔴"}
        </li>
        <li className="">
          {login && <h1 className="font-bold">Welcome, {loggedUser}</h1>}
          <div className="text-[22px]  font-bold bg-amber-900 h-10 p-3 flex items-center rounded-lg justify-center hover:text-slate-300">
            {!login ? (
              <Link to="/login">{logg()}</Link>
            ) : (
              <button
                onClick={() => {
                  setLogin(!login);
                  handleOnClick();
                }}
              >
                {logg()}
              </button>
            )}
          </div>

          {/* <div> */}
          {/* <div className="text-[22px] font-semibold">{loggedUser}</div> */}
          {/* <button
              className="text-[22px] font-semibold bg-amber-900 h-10  font-mono rounded-md"
              onClick={() => {
                logbtn === "Login" ? setLogbtn("Logout") : setLogbtn("Login");
              }}
            >
              {logbtn}
            </button>
          </div> */}
        </li>
      </ul>
    </div>
  );
};

export default Header;
