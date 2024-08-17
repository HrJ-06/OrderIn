import Card, { WithOffer } from "./Card";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { SWIGGY_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import contextAPI from "../utils/contextAPI";

const Body = () => {
  const [ress, setRess] = useState([]);
  const [resso, setResso] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const [val, setVal] = useState("");

  // https://cors-anywhere.herokuapp.com/ for CORS bypass
  const fetchData = async () => {
    try {
      const data = await fetch(SWIGGY_API);
      const json = await data.json();
      setRess(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setResso(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const online = useOnlineStatus();
  const Offer = WithOffer(Card);

  const { setTestCon, loggedUser } = useContext(contextAPI);

  if (!online) {
    return <h1 className="online">Looks like you're offline</h1>;
  }

  return !ress || (!Array.isArray(ress) || ress.length) === 0 ? (
    <Shimmer />
  ) : (
    <div className="bg-[#f0ddaa] p-4">
      <div className="flex  gap-16">
        <div className="flex gap-1">
          <input
            className="border h-8 rounded-md bg-slate-100"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
            }}
          ></input>
          <button
            className="h-8 w-20 text-lg border rounded-md bg-[#fcfabb] font-serif"
            onClick={() => {
              const curr = resso.filter((res) =>
                (res?.info?.name).toLowerCase().includes(val.toLowerCase())
              );
              setRess(curr);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="h-8 w-36 text-lg border rounded-lg bg-[#fcfabb] font-serif"
          onClick={() => {
            setRess(resso);
            setVal("");
          }}
        >
          All Restaurants{" "}
        </button>
        <button
          className="h-8 w-36 text-lg border rounded-lg bg-[#fcfabb] font-serif"
          onClick={() => {
            const top = ress.filter((res) => res?.info?.avgRating > 4.2);
            setRess(top);
          }}
        >
          Top Rated
        </button>
        <input
          className="border border-black"
          value={loggedUser}
          onChange={(e) => {
            setTestCon(e.target.value);
          }}
        ></input>
      </div>

      <div className="p-12 flex flex-wrap gap-10">
        {ress.map((re) => (
          <Link key={re?.info?.id} to={"/restaurant/" + re?.info?.id}>
            {re?.info?.aggregatedDiscountInfoV3 ? (
              <Offer res={re} />
            ) : (
              <Card res={re} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
