import React from "react";
import "./MyTransaction.css";
import { useDispatch } from "react-redux";
import { RemoveExpense } from "../Redux/ExpenseManagerSlice";

export default function MyTransaction({ myExpense }) {
  const dispatch = useDispatch();
  
  console.log(myExpense);
  const RemoveData = (id) => {
    console.log(id);
    dispatch(RemoveExpense(id));
  };
  return (
    <div>
      <table>
        <thead
          className="my-transaction-head"
          style={{ verticalAlign: "center" }}
        >
          <tr>
            <th>#</th>
            <th>Expense for</th>
            <th>Date</th>
            <th>Status</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {myExpense.map((item, i) => {
            return (
              <>
                <tr className="cross-container " id={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.expenseFor}</td>
                  <td>{item.date}</td>
                  <td>{item.transactionType}</td>
                  <td>${item.amount}</td>
                  <td>
                    <div class="cross-mark" >
                      <svg
                        onClick={() => RemoveData(item.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
