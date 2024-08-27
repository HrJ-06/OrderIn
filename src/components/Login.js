import { useContext, useState, useEffect } from "react";
import contextAPI from "../utils/contextAPI";
import { Link, useNavigate } from "react-router-dom";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

const Login = () => {
  const { setTestCon, setLogin } = useContext(contextAPI);
  const [enterVal, setEnterVal] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const handleOnClick = () => {
    Store.addNotification({
      title: "Logged In Successfully",
      container: "bottom-right",
      type: "success",
      insert: "top",

      dismiss: {
        duration: 1000,
      },
    });
  };

  return (
    <div className="h-screen flex justify-center">
      <div className="w-4/12 h-3/5 mt-8 bg-stone-300 border-3 border-opacity-5 border-slate-400 rounded-xl p-6">
        <div className="flex justify-center">
          <h2 className="text-3xl font-mono font-bold">Login</h2>
        </div>
        <div className="mt-8 flex items-center">
          <h2 className="text-[22px] mb-5 mr-5">Username:</h2>
          <input
            className="rounded-md mb-5 p-1"
            onChange={(e) => {
              setEnterVal(e.target.value);
            }}
          ></input>
        </div>
        <div className="flex justify-center">
          <Link
            className=" w-3/12 h-full p-1 rounded-md text-xl bg-slate-400 border-1 flex justify-center"
            onClick={() => {
              if (enterVal === "") {
                alert("Please enter a valid Username");
              } else {
                setTestCon(enterVal);
                setLogin(true);
                navigate("/");
                handleOnClick();
              }
            }}
          >
            Login
          </Link>
        </div>

        <h2 className="mt-8 mb-8 font-semibold text-2xl text-center">Or</h2>
        <div className="flex justify-center ">
          <Link
            className="pl-4 pr-4 pt-2 pb-2 h-full p-1 rounded-md text-xl bg-slate-400 border-1"
            onClick={() => {
              setTestCon("Guest");
              setLogin(true);
              navigate("/");
              handleOnClick();
            }}
          >
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
