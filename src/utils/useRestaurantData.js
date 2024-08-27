import { useEffect, useState } from "react";
import { RESTAURANT_PAGE, proxy_url } from "./constants";

const useRestaurantData = ({ resId }) => {
  const [resData, setResData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetch(proxy_url + RESTAURANT_PAGE + resId);
    const json = await data.json();
    setResData(json?.data?.cards);
  };

  return resData;
};

export default useRestaurantData;
