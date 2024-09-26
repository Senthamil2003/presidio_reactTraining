import { createSlice } from "@reduxjs/toolkit";

export const MyStockSlice = createSlice({
  name: "stock",
  initialState: {
    myStock: [],
    MyBalance: 1000,
  },
  reducers: {
    BuyStock: (state, action) => {
      let stockExists = false;
      state.myStock.forEach((item) => {
        if (item.id === action.payload.id) {
          item.ct += 1;
          stockExists = true;
        }
      });

      if (!stockExists) {
        state.myStock.push({ ...action.payload, ct: 1 });
      }
      state.MyBalance -= action.payload.price;
    },
    SellStock: (state, action) => {
      console.log(action);
      const updatedStocks = state.myStock.filter((item) => {
        return item.id != action.payload.id;
      });
      state.myStock = updatedStocks;

      state.MyBalance +=
        Number(action.payload.price) * Number(action.payload.ct);
    },
  },
});

export const { BuyStock, SellStock } = MyStockSlice.actions;
export default MyStockSlice.reducer;
