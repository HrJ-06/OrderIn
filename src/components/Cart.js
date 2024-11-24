import { useDispatch, useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearCart } from "../utils/cartSlice";
import Swal from "sweetalert2";
import { useContext } from "react";
import contextAPI from "../utils/contextAPI";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

const Cart = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(clearCart());
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    dispatch(clearCart());
    Swal.fire({
      title: "Success!",
      text: "Your Order has been Placed",
      icon: "success",
    });
    navigate("/");
  };
  const cartItems = useSelector((store) => store.cart.items);
  const { login } = useContext(contextAPI);

  const handleNotLogin = () => {
    Store.addNotification({
      title: "Kindly Login before Ordering",
      container: "bottom-right",
      type: "danger",
      insert: "top",

      dismiss: {
        duration: 1000,
      },
    });
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  let total = 0;

  return cartItems.length === 0 ? (
    <div className="min-h-screen flex flex-col justify-center gap-9 items-center h-fit">
      <h1 className="font-bold text-2xl">Looks like your cart is empty!</h1>
      <h1 className="font-semibold text-2xl mb-44">
        Add your favourite food and come back.
      </h1>
    </div>
  ) : (
    <div className="flex flex-col items-center min-h-screen p-7">
      <h1 className="font-bold text-2xl p-5">Your Cart</h1>
      <div className="w-6/12 flex justify-start">
        <button
          className="m-6 font-semibold text-lg bg-slate-400 rounded-lg p-2"
          onClick={() => {
            handleClick();
          }}
        >
          Clear Cart
        </button>
      </div>
      <div className="w-6/12">
        {cartItems.map((item) => {
          total +=
            (item.data[0]?.card?.info?.price / 100 ||
              item.data[0]?.card?.info?.defaultPrice / 100) * item?.data[1];
          return (
            <OrderCard
              key={item?.data[0]?.card?.info?.id}
              data={[item?.data[0], item?.data[1]]}
              resval={0}
            />
          );
        })}
      </div>
      <div className="font-extrabold text-xl mt-5 mb-8 w-2/4 pr-24 flex justify-between">
        <h1>Total Cost to Pay :</h1>
        <h1>₹ {total}</h1>
      </div>
      <div className="w-5/12 h-4 mr-24 flex justify-center m-5">
        <button
          className="bg-green-400 rounded-xl text-lg font-bold p-3 py-5 flex items-center"
          onClick={() => {
            login ? handleSubmit() : handleNotLogin();
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
