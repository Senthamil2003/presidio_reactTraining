import { useDispatch } from "react-redux";
import { BuyStock } from "../store/MyStockSlice";

export const StockListItem = ({ stock }) => {
  const dispatch = useDispatch();

  return (
    <li className="stock-list-item" key={stock.id}>
      <div className="stock-name">{stock.name}</div>
      <div>${stock.price.toFixed(2)}</div>
      <button className="buy-button" onClick={()=>dispatch(BuyStock(stock))}>Buy</button>
    </li>
  );
};
