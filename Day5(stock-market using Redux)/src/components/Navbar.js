import { useSelector } from "react-redux";

export const Navbar = () => {
  const { MyBalance } = useSelector((state) => state.myStock);
  return (
    <nav className="flex-row flex-space-between">
      <h1 style={{ fontWeight: "bold" }}>Stock Market</h1>
      <h1>Balance: ${MyBalance.toFixed(2)}</h1>
    </nav>
  );
};
