import React, { useEffect, useState } from "react";
import "./stats.css";
import { GaugeComponent } from "react-gauge-component";
import { FaRegCalendarAlt } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { FilterByDate, Reset } from "../Redux/ExpenseManagerSlice";

export default function Stats({ income, expense }) {
  const dispatch = useDispatch();
  const [percent, setPercent] = useState(0);
  const [percentText, setPercentText] = useState("expense/Income %");
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  let percentct = 0;

  useEffect(() => {
    if (income >= expense) {
      if (income !== 0 && expense !== 0) {
        percentct = expense / income;
      }
      percentct *= 100;
      setPercentText("expense/Income %");
    } else {
      percentct = 100;
      setPercentText(`Expense exceed by ${expense - income}`);
    }

    setPercent(percentct);
  }, [income, expense]);

  const handleShowCalendarModal = () => {
    setShowCalendarModal(true);
  };

  const handleCloseCalendarModal = () => {
    setShowCalendarModal(false);
  };

  const handleApplyDates = () => {
    console.log(`From Date: ${fromDate}, To Date: ${toDate}`);
    dispatch(FilterByDate({ fromDate, toDate }));

    handleCloseCalendarModal();
  };

  return (
    <div className="container-fluid stats-tot-cont">
      <div className="row">
        <div
          className="col d-flex justify-content-end"
          style={{ width: "100%" }}
        >
          <div className="calender-cont" onClick={handleShowCalendarModal}>
            <FaRegCalendarAlt className="calander-icon" />
          </div>
        </div>
      </div>

      <Modal show={showCalendarModal} onHide={handleCloseCalendarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Date Range</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="fromDate">
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="toDate">
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCalendarModal}>
            Close
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              dispatch(Reset());
              setFromDate("");
              setToDate("");
              setShowCalendarModal(false);
            }}
          >
            Reset
          </Button>
          <Button variant="dark" onClick={handleApplyDates}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Stats Rows */}
      <div className="row">
        <div className="col d-flex justify-content-center">
          <div className="stats-cont">
            <div>
              <p className="stats-income" style={{ color: "rgb(21, 182, 21)" }}>
                ${income}
              </p>
              <p className="stats-head">Total Income</p>
              <div className="arrow-svg in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  className="bi bi-arrow-down-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="col d-flex justify-content-center">
          <div className="stats-cont">
            <div>
              <p className="stats-income" style={{ color: "red" }}>
                ${expense}
              </p>
              <p className="stats-head">Total Expenses</p>
              <div className="arrow-svg out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  className="bi bi-arrow-up-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="col d-flex justify-content-center">
          <div className="stats-cont-gauge">
            <GaugeComponent className="gauge" value={percent} />
            <p className="stats-head"> {percentText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
