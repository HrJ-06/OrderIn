import { useParams } from "react-router-dom";
import useRestaurantData from "../utils/useRestaurantData";
import ResCat from "./ResCat";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Restaurant = () => {
  const { resId } = useParams();
  const resdata = useRestaurantData({ resId });
  const [openIndex, setOpenIndex] = useState(null);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    totalRatingsString,
    areaName,
    sla,
  } = resdata[2]?.card?.card?.info || {};
  const itemMenu = resdata[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  if (!itemMenu) {
    return (
      <div className="p-10 min-h-screen">
        <div className="mb-10">
          <Skeleton className="h-36 mt-12 p-5 w-6/12 ml-[310px] rounded-xl bg-gray-200" />
        </div>
        <Skeleton className="w-6/12 border-b-2 bg-slate-100 rounded-xl mb-2 ml-[310px] h-[70px]"></Skeleton>
      </div>
    );
  }
  const itemCats = itemMenu.filter(
    (val) =>
      val?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="text-center p-10 min-h-screen">
      <div className="mb-10">
        <h1 className="font-bold text-2xl mb-5 ">{name}</h1>
        <div className="p-5 border border-gray-400 w-6/12 ml-[310px] rounded-xl shadow-2xl text-left bg-slate-100">
          <h3 className="text-lg font-semibold">
            ⭐ {avgRating} ({totalRatingsString}) : {costForTwoMessage}
          </h3>
          <h3 className="">{cuisines ? cuisines.join(", ") : []}</h3>
          <h3>{areaName} </h3>
          <h3>{sla.slaString}</h3>
        </div>
      </div>

      {itemCats.map((item, index) => {
        const { itemCards, title } = item?.card?.card;
        return (
          <div className="flex justify-center" key={title}>
            <div className="w-6/12 border-b-2 bg-slate-100 rounded-xl mb-2">
              <ResCat
                cat={item}
                showItems={index === openIndex && true}
                setIndex={() => {
                  if (openIndex === index) {
                    setOpenIndex(null);
                  } else {
                    setOpenIndex(index);
                  }
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Restaurant;
