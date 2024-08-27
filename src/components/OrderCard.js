import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
} from "../utils/cartSlice";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

const OrderCard = ({ data, resval }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const handleDispatch = ({ data }) => {
    const ind = cartItems.findIndex(
      (item) => item?.data[0]?.card?.info?.id === data[0]?.card?.info?.id
    );
    if (ind != -1) {
      dispatch(incrementItem(ind));
    } else {
      dispatch(addItem({ data }));
    }
  };
  const removeDispatch = ({ data }) => {
    const ind = cartItems.findIndex(
      (item) => item?.data[0]?.card?.info?.id === data[0]?.card?.info?.id
    );
    if (cartItems[ind].data[1] > 1) {
      dispatch(decrementItem(ind));
    } else {
      dispatch(removeItem({ data }));
    }
  };
  const { name, description, imageId, price, defaultPrice } =
    data[0]?.card?.info;

  const handleOnClick = () => {
    Store.addNotification({
      title: "Item Added Successfully",
      container: "bottom-right",
      type: "success",
      insert: "top",

      dismiss: {
        duration: 1000,
      },
    });
  };
  const handleOnClick2 = () => {
    Store.addNotification({
      title: "Item Has Been Removed",
      container: "bottom-right",
      type: "info",
      insert: "top",

      dismiss: {
        duration: 1000,
      },
    });
  };

  return (
    <div className="flex justify-between p-5 border-t-4">
      <div className="text-left w-8/12">
        <div className="font-bold mb-3">{name}</div>
        <div className="font-semibold">
          ₹ {price / 100 || defaultPrice / 100}
        </div>
        <div className="pt-4 pr-3">{description}</div>
      </div>
      <div className="w-4/12 h-48 p-4 ml-3 flex flex-col gap-2 items-center">
        <img src={CDN_URL + imageId} className="w-[600px] rounded-lg h-40" />
        {resval ? (
          <button
            className="bg-slate-400 text-lg font-semibold w-16 rounded-lg"
            onClick={() => {
              handleOnClick();
              handleDispatch({ data });
            }}
          >
            Add
          </button>
        ) : (
          <button
            className="bg-red-600 text-lg font-semibold pl-2 pr-2 rounded-lg "
            onClick={() => {
              handleOnClick2();
              removeDispatch({ data });
            }}
          >
            Remove Item
          </button>
        )}
      </div>
      {!resval && (
        <h1 className="font-semibold text-2xl w-10 flex justify-center items-center">
          x {data[1]}
        </h1>
      )}
    </div>
  );
};

export default OrderCard;
