import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
const OrderCard = ({ data }) => {
  const dispatch = useDispatch();
  const handleDispatch = ({ data }) => {
    dispatch(addItem({ data }));
  };
  const { name, description, imageId, price, defaultPrice } = data?.card?.info;
  return (
    <div className="flex justify-between p-5 border-b-4">
      <div className="text-left w-8/12">
        <div className="font-semibold mb-3">{name}</div>
        <div>₹ {price / 100 || defaultPrice / 100}</div>
        <div className="pt-4 pr-3">{description}</div>
      </div>
      <div className="w-4/12 h-48 p-4 ml-3">
        <img src={CDN_URL + imageId} className="w-[600px] rounded-lg h-40" />
        <button
          className="bg-slate-400 text-lg font-semibold w-16 rounded-lg"
          onClick={() => {
            handleDispatch({ data });
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
