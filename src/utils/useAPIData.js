import { SWIGGY_API } from "../utils/constants";
import { useState, useEffect } from "react";

const useAPIData=()=>{
    const [ress,setRess]= useState();

    useEffect(()=>{
        fetchData();
      },[]);
        // https://cors-anywhere.herokuapp.com/ for CORS bypass

    const fetchData=async ()=>{
        try{
        const data= await fetch(SWIGGY_API);
        const json= await data.json();
        setRess(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        } catch(error){
          console.error("Error fetching data:",error);
        }
      }

      return ress;
}
//isko dekh kaise chalana hai
export default useAPIData;