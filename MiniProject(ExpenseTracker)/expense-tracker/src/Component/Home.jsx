import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Home.css";
import Form from "react-bootstrap/Form";
import MyTransaction from "./MyTransaction";
import { useDispatch, useSelector } from "react-redux";
import { AddExpense } from "../Redux/ExpenseManagerSlice";
import Stats from "./Stats";

export default function Home() {
  const [expenseFor, setExpenseFor] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const { myExpense } = useSelector((state) => state.expenseManager);
  const [search, setSearch] = useState("");
  const [filterResultData, setFilterResultData] = useState(myExpense);
  const [filterData, setfilterData] = useState({
    sortBy: "",
    OrderBy: "Ascending",
    statusFilter: "",
  });

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [expense, setExpense] = useState({
    income: 0,
    expense: 0,
  });

  const handleCloseExpenseModal = () => setShowExpenseModal(false);
  const handleShowExpenseModal = () => setShowExpenseModal(true);

  const handleCloseFilterModal = () => setShowFilterModal(false);
  const handleShowFilterModal = () => setShowFilterModal(true);

  const dispatch = useDispatch();

  useEffect(() => {
    let incomect = 0;
    let expensect = 0;
    myExpense.map((item) => {
      if (item.transactionType == "send") {
        expensect += Number(item.amount);
      } else if (item.transactionType == "receive") {
        incomect += Number(item.amount);
      }
    });
    setExpense({
      income: incomect,
      expense: expensect,
    });
  }, [myExpense]);
  useEffect(() => {
    let filterResult = [...myExpense];

    if (search !== "") {
      filterResult = filterResult.filter((item) =>
        item.expenseFor.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterData.statusFilter != "") {
      filterResult = filterResult.filter((item) => {
        return item.transactionType == filterData.statusFilter;
      });
    }
    if (filterData.sortBy !== "") {
      if (filterData.sortBy === "amount") {
        filterResult = filterResult.sort((a, b) => {
          if (filterData.OrderBy === "Ascending") {
            return a.amount - b.amount;
          } else {
            return b.amount - a.amount;
          }
        });
      } else if (filterData.sortBy === "date") {
        filterResult = filterResult.sort((a, b) => {
          if (filterData.OrderBy === "Ascending") {
            return new Date(a.date) - new Date(b.date);
          } else {
            return new Date(b.date) - new Date(a.date);
          }
        });
      }
    }

    setFilterResultData(filterResult);
    console.log(filterResult);
  }, [search, filterData, myExpense]);

  const handleSaveChanges = () => {
    const newTransaction = {
      id: Date.now(),
      expenseFor,
      date,
      transactionType,
      amount,
    };
    console.log(newTransaction);

    setExpenseFor("");
    setDate(new Date().toISOString().split("T")[0]);
    setTransactionType("");
    setAmount("");
    dispatch(AddExpense(newTransaction));
    handleCloseExpenseModal();
  };

  const handleFilter = () => {
    handleCloseFilterModal();
  };

  return (
    <div className="home-tot-cont">
      <Stats income={expense.income} expense={expense.expense} />
      <div className="home-action-cont">
        <Button
          variant="dark"
          className="add-transaction"
          onClick={handleShowExpenseModal}
        >
          + Add Expenses
        </Button>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="email"
            style={{ width: "280px" }}
            placeholder="search for transaction"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="dark"
          className="filter-transaction"
          onClick={handleShowFilterModal}
        >
          Filter data
        </Button>
      </div>

      <Modal show={showExpenseModal} onHide={handleCloseExpenseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expenses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="expensefor">
              <Form.Label>Expense for</Form.Label>
              <Form.Control
                type="text"
                placeholder="Current bill, House rent..."
                value={expenseFor}
                onChange={(e) => setExpenseFor(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="transactionType">
              <Form.Label>Send or Receive</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option>Select option</option>
                <option value="send">Send</option>
                <option value="receive">Receive</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExpenseModal}>
            Close
          </Button>
          <Button variant="dark" onClick={handleSaveChanges}>
            Add Expense
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFilterModal} onHide={handleCloseFilterModal}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Transactions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Sort By */}
            <Form.Group className="mb-3" controlId="sortBy">
              <Form.Label>Sort By</Form.Label>
              <Form.Select
                aria-label="Sort by field"
                value={filterData.sortBy}
                onChange={(e) =>
                  setfilterData({ ...filterData, sortBy: e.target.value })
                }
              >
                <option value="">Select field to sort by</option>
                <option value="amount">Amount</option>
                <option value="date">Date</option>
              </Form.Select>
            </Form.Group>

            {/* Order By */}
            <Form.Group className="mb-3" controlId="OrderBy">
              <Form.Label>Order By</Form.Label>
              <Form.Select
                aria-label="Order by"
                value={filterData.OrderBy}
                onChange={(e) =>
                  setfilterData({ ...filterData, OrderBy: e.target.value })
                }
              >
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
              </Form.Select>
            </Form.Group>

            {/* Status Filter (Send/Receive) */}
            <Form.Group className="mb-3" controlId="statusFilter">
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Filter by status"
                value={filterData.statusFilter}
                onChange={(e) =>
                  setfilterData({ ...filterData, statusFilter: e.target.value })
                }
              >
                <option value="">Select Status</option>
                <option value="send">Send</option>
                <option value="receive">Receive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFilterModal}>
            Close
          </Button>
          <Button variant="dark" onClick={handleFilter}>
            Apply Filter
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <MyTransaction myExpense={filterResultData} key={1} />
      </div>
    </div>
  );
}
