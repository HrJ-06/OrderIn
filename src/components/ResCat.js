import OrderCard from "./OrderCard";

const ResCat = ({ cat, showItems, setIndex }) => {
  const toggleSet = () => {
    setIndex();
  };
  const { title, itemCards } = cat?.card?.card;
  return (
    <div className="shadow-lg">
      <div
        className="flex justify-between w-full p-5 hover:cursor-pointer"
        onClick={toggleSet}
      >
        <div className="font-semibold text-lg">
          {title} ({itemCards.length})
        </div>
        {showItems ? <div>🔼</div> : <div>🔽</div>}
      </div>

      {itemCards.map((itemc) => {
        return (
          <div key={itemc?.card?.info?.id}>
            {showItems && <OrderCard data={[itemc, 1]} resval={1} />}
          </div>
        );
      })}
    </div>
  );
};

export default ResCat;
