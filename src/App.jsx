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

  const availableIncome = paycheckCount * PAYCHECK_AMOUNT;

  const [expenses, setExpenses] = useState({
    rent: 0,
    carPayment: 0,
    carInsurance: 0,
    gas: 0,
    groceries: 0,
    electric: 0,
    internet: 0,
    phone: 0,
    transportation: 0,
    subscriptions: 0,
  });

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  const totalExpenses = Object.values(expenses).reduce(
  (sum, value) => sum + Number(value || 0),
  0
  );

  const currentBalance = availableIncome - totalExpenses;

  const handleExpenseChange = (category, value) => {
    setExpenses({
      ...expenses,
      [category]: Number(value) || 0,
    });
  };

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

      <Row>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
              Bill Type
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Rent</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Car Payment</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Car Insurance</Dropdown.Item>
            <Dropdown.Item href="#/action-4">Internet</Dropdown.Item>
            <Dropdown.Item href="#/action-5">Gas</Dropdown.Item>
            <Dropdown.Item href="#/action-6">Electric</Dropdown.Item>
            <Dropdown.Item href="#/action-7">Transportation</Dropdown.Item>
            <Dropdown.Item href="#/action-8">Subscriptions</Dropdown.Item>
            <Dropdown.Item href="#/action-9">Phone</Dropdown.Item>
            <Dropdown.Item href="#/action-10">Groceries</Dropdown.Item>
            <Dropdown.Item href="#/action-11">Other</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      </Row>

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
      

    </section>
  );
}



export default App


