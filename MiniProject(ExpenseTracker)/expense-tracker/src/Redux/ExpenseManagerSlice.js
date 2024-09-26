import { createSlice } from "@reduxjs/toolkit";

export const ExpenseManagerSlice = createSlice({
  name: "stock",
  initialState: {
    myExpense: [],
    dbData: [],
  },
  reducers: {
    AddExpense: (state, action) => {
      state.myExpense.push(action.payload);
      state.dbData.push(action.payload);
    },
    RemoveExpense: (state, action) => {
      const UpdateExpense = state.myExpense.filter((item) => {
        return item.id != action.payload;
      });
      console.log(UpdateExpense, action.payload);
      state.myExpense = UpdateExpense;
      state.dbData = UpdateExpense;
    },
    FilterByDate: (state, action) => {
      const UpdateExpense = state.myExpense.filter((item) => {
        return (
          item.date >= action.payload.fromDate &&
          item.date <= action.payload.toDate
        );
      });
      console.log(UpdateExpense, action.payload);
      state.myExpense = UpdateExpense;
    },
    Reset: (state) => {
      state.myExpense = state.dbData;
    },
  },
});

export const { AddExpense, RemoveExpense, FilterByDate, Reset } =
  ExpenseManagerSlice.actions;
export default ExpenseManagerSlice.reducer;
