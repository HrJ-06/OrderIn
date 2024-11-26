import { useEffect, useState } from "react";
import { CDN_URL } from "../utils/constants";

const Card = ({ res }) => {
  const { name, cuisines, avgRating, sla } = res?.info || {};
  const [isMax, setIsMax] = useState(false);
  const [cuis, setCuis] = useState(cuisines);

  useEffect(() => {
    if (cuisines && cuisines.length > 4) {
      setCuis(cuisines.slice(0, 4));
      setIsMax(true);
    }
  }, []);

  return (
    <div
      className="w-52 rounded-lg bg-[#edede8] p-2 h-[450px] hover:bg-[#c4c4b1]"
      data-testid="cardss"
    >
      <img
        className="rounded-lg h-2/4 w-full"
        src={CDN_URL + res?.info?.cloudinaryImageId}
      ></img>
      <div className="h-2/4 flex flex-col gap-2">
        <h3 className="font-semibold text-center text-lg mb-2">{name}</h3>
        {isMax ? (
          <h4>{cuis.join(", ")}....</h4>
        ) : (
          <h4>{cuisines.join(", ")}</h4>
        )}
        <h4>{avgRating} ⭐</h4>
        <h4>{sla.deliveryTime} mins</h4>
      </div>
    </div>
  );
};

export const WithOffer = (Card) => {
  return ({ res }) => {
    const { header, subHeader } = res?.info?.aggregatedDiscountInfoV3 || {};
    const ans = header + " " + subHeader;
    return (
      <div className="flex">
        <Card res={res} />
        <h3 className="font-bold font-[fantasy] text-[20px] text-yellow-400 p-3 absolute z-0">
          {ans}
        </h3>
      </div>
    );
  };
};

export default Card;
