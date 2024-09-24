import React, { useEffect } from "react";
import { StockListItem } from "./StockListItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/dataSlice";

export const StockList = () => {
  const { items, loading, error } = useSelector((state) => state.data);
   
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex-column gap-1">
      <h2>Stock List</h2>

      <ul className="flex-column gap-1">
        {items.length > 0 &&
          items.map((stock) => (
            <StockListItem key={stock.id} stock={stock}></StockListItem>
          ))}
      </ul>
    </div>
  );
};
