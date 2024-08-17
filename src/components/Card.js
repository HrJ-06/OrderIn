import { CDN_URL } from "../utils/constants";

const Card = ({ res }) => {
  const { name, cuisines, avgRating, sla } = res?.info || {};
  return (
    <div className="w-52 rounded-lg bg-[#edede8] p-2 h-[400px] hover:bg-[#c4c4b1] ">
      <img
        className="rounded-lg"
        src={CDN_URL + res?.info?.cloudinaryImageId}
      ></img>
      <h3 className="font-semibold text-center text-lg mb-2">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} ⭐</h4>
      <h4>{sla.deliveryTime} min</h4>
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
        <h3 className="font-bold font-[fantasy] text-[20px] text-neutral-950 p-3 absolute ">
          {ans}
        </h3>
      </div>
    );
  };
};

export default Card;
