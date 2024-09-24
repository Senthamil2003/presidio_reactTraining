import { useSelector } from "react-redux";
import { PortfolioItem } from "./PortfolioItem";

export const Portfolio = () => {
 
  const { myStock } = useSelector((state) => state.myStock);  
  console.log(myStock);

  return (
    <div className="flex-column gap-1">
      <h2>Portfolio</h2>

      
      <ul className="flex-column gap-1">
        {myStock.map((item) => (
          <PortfolioItem key={item.id} stock={{ ...item }} />
        ))}
      </ul>
    </div>
  );
};
