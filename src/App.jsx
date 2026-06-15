import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Calendar from 'react-calendar';
import './app.css'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Chart } from "react-google-charts";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  // Firefly animation
   const fireFliesContainerRef = useRef(null);
    const totalFireFlies = 50;

    useEffect(() => {

        const w = window.innerWidth;
        const h = window.innerHeight;

        const Anim = (elm) => {
            const containerRect = fireFliesContainerRef.current.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const containerHeight = containerRect.height;

            gsap.to(elm, {
                duration: Math.random() * 10 + 10,
                x: Math.random() * containerWidth,
                y: Math.random() * containerHeight,
                opacity: Math.random(),
                scale: Math.random() * 0.5 + 1,
                delay: Math.random() * 2,
                onComplete: () => Anim(elm),
            });
        };

        const fireFlies = fireFliesContainerRef.current.children;

        for (let i = 0; i < totalFireFlies; i++) {
            const fireFly = fireFlies[i];
            gsap.set(fireFly, { opacity: 0 });
            Anim(fireFly);
        }

        return () => {
            for (let i = 0; i < totalFireFlies; i++) {
                gsap.killTweensOf(fireFlies[i]);
            }
        };
    }, []);


  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("budget");
    return saved ? parseFloat(saved) : 3200;
  });

  const PAYCHECK_START = new Date("2026-06-25");
  const PAYCHECK_AMOUNT = 1600;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bills, setBills] = useState([]);
  const [billName, setBillName] = useState("");

  const daysSinceStart = Math.floor(
    (selectedDate - PAYCHECK_START) / (1000 * 60 * 60 * 24)
  );

  const paycheckCount =
    daysSinceStart >= 0
      ? Math.floor(daysSinceStart / 14) + 1
      : 0;

  const availableIncome = budget + (paycheckCount * PAYCHECK_AMOUNT);

  const [expenses, setExpenses] = useState([]);
  const [otherExpense, setOtherExpense] = useState("");
  const [selectedBillType, setSelectedBillType] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const currentBalance = availableIncome - totalExpenses;

  const addBill = () => {
    if (!billName.trim()) return;

    setBills([
      ...bills,
      {
        name: billName,
        dueDate: selectedDate,
      },
    ]);

    setBillName("");
  };

  // const addExpense = () => {
  //   if (!selectedBillType || !amount) return;

  //   setExpenses([
  //     ...expenses,
  //     {
  //       id: Date.now(),
  //       type: selectedBillType,
  //       amount: Number(amount),
  //     },
  // ]);

  // setAmount("");
  // };

  const addExpense = () => {
    const expenseType =
      selectedBillType === "Other"
        ? otherExpense.trim()
        : selectedBillType;

    if (!expenseType || !amount) return;

    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        type: expenseType,
        amount: Number(amount),
      },
    ]);

    setAmount("");
    setOtherExpense("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const updateExpense = (id, value) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id
          ? { ...expense, amount: Number(value) || 0 }
          : expense
      )
    );
  };

  return (
    <section className="fireflies-container" ref={fireFliesContainerRef}>
      {Array.from({ length: totalFireFlies }, (_, index) => (
                    <div
                        key={index}
                        className="dot"
                    />
                ))}
      <h1>≽༏≼ Firefly Treasury ≽༏≼</h1>

      <div>
        <h4>Monthly Budget</h4>
        <p>${budget.toFixed(2)}</p>

        <h4>Current Balance</h4>
        <p>${currentBalance.toFixed(2)}</p>
      </div>
      {/* insert bill */}
      <Row>
        <Dropdown>
          <Dropdown.Toggle variant="success">
            {selectedBillType || "Bill Type"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedBillType("Rent")}>Rent
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedBillType("Car Payment")}>Car Payment</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedBillType("Car Insurance")}>Car Insurance</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedBillType("Internet")}>Internet</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedBillType("Gas")}>Gas</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedBillType("Electric")}>Electric</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedBillType("Transportation")}>Transportation</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedBillType("Subscriptions")}>Subscriptions</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedBillType("Phone")}>Phone</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedBillType("Groceries")}>Groceries</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedBillType("Other")}>Other</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
        {selectedBillType && (
          <div style={{ marginTop: "10px" }}>
            {selectedBillType === "Other" && (
      <input
        type="text"
        placeholder="Expense Name"
        value={otherExpense}
        onChange={(e) => setOtherExpense(e.target.value)}
      />
            )}
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={addExpense}>Add Expense</button>
          </div>
        )}
      </Row>
      {/* calender */}
      <Row>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
          />

          <input
            type="text"
            value={billName}
            onChange={(e) => setBillName(e.target.value)}
            placeholder="bill"
          />

          <button onClick={addBill}>Add</button>

          <ul>
            {bills.map((bill, index) => (
              <li key={index}>
                {bill.name} — Due:{" "}
                {bill.dueDate.toLocaleDateString()}
                <button
                  onClick={() =>
                    setBills(
                      bills.filter((_, i) => i !== index)
                    )
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
      </Row>
      {/* expenses list */}
      <Row>
        <div style={{ marginTop: "20px" }}>
          <h4>Expenses</h4>
          {expenses.map((expense) => (
            <div
              key={expense.id}
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "10px",
                alignItems: "center",
              }}
            >
              <span>{expense.type}</span>
              <input
                type="number"
                value={expense.amount}
                onChange={(e) =>
                  updateExpense(expense.id, e.target.value)
                }
              />
              <button onClick={() => deleteExpense(expense.id)}>Delete</button>
              </div>
            ))}
        </div>
      </Row>
    </section>
  );
}



export default App


