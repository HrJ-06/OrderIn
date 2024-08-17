import OrderCard from "./OrderCard";
import { useState } from "react";

const ResCat = ({ cat, showItems, setIndex }) => {
  //   const [showItems, setShowItems] = useState(false);
  const toggleSet = () => {
    setIndex();
  };
  const { title, itemCards } = cat?.card?.card;
  return (
    <div>
      <div
        className="flex justify-between w-full p-5 hover:cursor-pointer"
        onClick={toggleSet}
      >
        <div className="font-semibold text-lg">
          {title} ({itemCards.length})
        </div>
        <div>🔽</div>
      </div>

      {itemCards.map((itemc) => {
        return (
          <div key={itemc?.card?.info?.id}>
            {showItems && <OrderCard data={itemc} />}
          </div>
        );
      })}
    </div>
  );
};

export default ResCat;
