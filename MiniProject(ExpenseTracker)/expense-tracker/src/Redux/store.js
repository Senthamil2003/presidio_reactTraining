import { configureStore } from "@reduxjs/toolkit";
import ExpenseManagerSlice from "./ExpenseManagerSlice";

export const store = configureStore({
  reducer: {
    expenseManager: ExpenseManagerSlice,
  },
});
