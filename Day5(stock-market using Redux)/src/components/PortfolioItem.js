import { useDispatch } from "react-redux";
import { SellStock } from "../store/MyStockSlice";

export const PortfolioItem = ({ stock }) => {
  const dispatch = useDispatch();

  console.log(stock);
  return (
    <li className="stock-list-item" key={stock.id}>
      <div className="flex-row gap-0-5 stock-name">
        <span>{stock.name}</span>
        <span>( {stock.ct} )</span>
      </div>
      <div>{(stock.ct * stock.price).toFixed(2)}</div>
      <button className="sell-button" onClick={() => dispatch(SellStock(stock))}>
        Sell
      </button>
    </li>
  );
};
