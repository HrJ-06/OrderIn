import Card, { WithOffer } from "./Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SWIGGY_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Body = () => {
  const [ress, setRess] = useState([]);
  const [resso, setResso] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avgRate, setAvgRate] = useState(0);
  const [avgTime, setAvgTime] = useState(30);
  let timesum = 0;
  let ratesum = 0;

  useEffect(() => {
    fetchData();
    window.scroll(0, 0);
  }, []);
  const [val, setVal] = useState("");

  const fetchData = async () => {
    try {
      const data = await fetch(SWIGGY_API);
      const json = await data.json();
      const restaurants =
        (
          json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle ||
          json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
        )?.restaurants || [];
      restaurants.forEach((res) => {
        timesum += res.info.sla.deliveryTime;
        ratesum += res.info.avgRating;
      });
      setRess(restaurants);
      setResso(restaurants);
      setAvgTime(timesum / 8);
      setAvgRate(ratesum / 8);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const online = useOnlineStatus();
  const Offer = WithOffer(Card);

  if (!online) {
    return (
      <h1 className="text-center p-10 font-bold text-xl">
        Oops! Looks like you're offline 😓
      </h1>
    );
  }

  return (
    <div className="p-4 min-h-screen ">
      <div className="flex gap-12 ml-12">
        <div className="flex gap-1">
          <input
            className="border h-8 rounded-md bg-slate-100"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
            }}
            data-testid="input"
          ></input>
          <button
            className="h-8 w-20 text- font-semibold border rounded-md bg-[#fcfabb] font-serif"
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
          className="h-8 px-2 text-lg border font-semibold rounded-lg bg-[#fcfabb] font-serif"
          onClick={() => {
            setRess(resso);
            setVal("");
          }}
        >
          All Restaurants
        </button>
        <button
          className="h-8 w-36 text-lg border font-semibold rounded-lg bg-[#fcfabb] font-serif"
          onClick={() => {
            const top = ress.filter(
              (res) => res?.info?.avgRating > ratesum / 8
            );
            setRess(top);
          }}
        >
          Top-Rated
        </button>
        <button
          className="h-8 w-36 text-lg border font-semibold rounded-lg bg-[#fcfabb] font-serif"
          onClick={() => {
            const top = ress.filter(
              (res) => res?.info?.sla?.deliveryTime < timesum / 8
            );
            setRess(top);
          }}
        >
          Least Time
        </button>
      </div>

      <div className="p-12 flex flex-wrap gap-10">
        {loading
          ? Array(8)
              .fill()
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="rounded-lg h-[400px] bg-slate-300 w-52"
                />
              ))
          : ress.map((re) => {
              ratesum += re.info.avgRating;
              timesum += re.info.sla.deliveryTime;
              return (
                <Link
                  key={re?.info?.id}
                  to={"/restaurant/" + re?.info?.id}
                  data-testid="cards"
                >
                  {re?.info?.aggregatedDiscountInfoV3 ? (
                    <Offer res={re} />
                  ) : (
                    <Card res={re} />
                  )}
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default Body;
