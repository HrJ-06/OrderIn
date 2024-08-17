import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  return cartItems.length === 0 ? (
    <h1 className="font-bold text-2xl m-24 ml-[600px]">Cart is Empty!</h1>
  ) : (
    <div className="flex justify-center">
      <div className="w-6/12">
        {cartItems.map((item, index) => (
          <OrderCard
            key={cartItems[index]?.data?.card?.info?.id}
            data={cartItems[index]?.data}
          />
        ))}
      </div>
    </div>
  );
};

export default Cart;
