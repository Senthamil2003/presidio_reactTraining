// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import MyStockSlice from "./MyStockSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
    myStock: MyStockSlice,
  },
});
