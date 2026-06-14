import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './app.css'



import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Chart } from "react-google-charts";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
   // State Management
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('budget');
    return saved ? parseFloat(saved) : 3200;
  });
  
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Groceries', amount: 150, category: 'Food' },
      { id: 2, name: 'Electricity Bill', amount: 90, category: 'Utilities' },
    ];
  });

  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Food');
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tempBudget, setTempBudget] = useState(budget);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('budget', budget);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Calculations
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingBalance = budget - totalSpent;

  // Handlers
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseName || !expenseAmount || parseFloat(expenseAmount) <= 0) return;

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
    };

    setExpenses([...expenses, newExpense]);
    setExpenseName('');
    setExpenseAmount('');
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleSaveBudget = () => {
    if (tempBudget >= 0) {
      setBudget(tempBudget);
      setIsEditingBudget(false);
    }
  };

  const [value, onChange] = useState(new Date());

   const [selectedDate, setSelectedDate] = useState(new Date());
  const [bills, setBills] = useState([]);
  const [billName, setBillName] = useState('');

  const addBill = () => {
    if (!billName.trim()) return;

    setBills([
      ...bills,
      {
        name: billName,
        dueDate: selectedDate,
      },
    ]);

    setBillName('');
  };

  const deleteBill = (billNameToDelete) => {
  setBills(bills.filter((bill) => bill.name !== billNameToDelete));
};

  return (
    <section>
      <h1 style={styles.title}>💰 The Treasury</h1>
      <div>
          <h3>Monthly Budget</h3>
          {isEditingBudget ? (
            <div>
              <input
                type="number"
                value={tempBudget}
                onChange={(e) => setTempBudget(parseFloat(e.target.value) || 0)}
                style={styles.inlineInput}
              />
              <button onClick={handleSaveBudget}>Save</button>
            </div>
          ) : (
            <div>
              <span>${budget.toFixed(2)}</span>
              <button onClick={() => { setTempBudget(budget); setIsEditingBudget(true); }}>Edit</button>
            </div>
          )}
      </div>
      <Row>
            <Col className="left" style={{alignItems: "left !important", justifyContent: "left !important  ", border: "2px solid green"}}>
              <ul>Rent</ul>
              <ul>Car Payment</ul>
              <ul>Car Insurance</ul>
              <ul>Gas</ul>
              <ul>Groceries</ul>
              <ul>Electric</ul>
              <ul>Internet</ul>
              <ul>Phone</ul>
              <ul>Transportation</ul>
              <ul>Subscriptions</ul>
              <ul></ul>
              <ul></ul>
              <ul></ul>
            </Col>
            <Col>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
              />
             {/* add a bill to the calendar */}
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
                      {bill.name} — Due: {bill.dueDate.toLocaleDateString()}
                        <button
                          onClick={() =>
                            setBills(bills.filter((_, i) => i !== index))
                          }
                        >
                          Delete
                        </button>
                    </li>
                  ))}
                </ul>
            </Col>
      </Row>
    </section>
  );
}

// Embedded Styling for easy deployment
const styles = {
  container: { maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'system-ui, sans-serif', color: '#333' },
  title: { textAlign: 'center', marginBottom: '30px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' },
  card: { padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  amount: { fontSize: '24px', fontWeight: 'bold', display: 'block', marginTop: '10px' },
  flexSpace: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  flexAlign: { display: 'flex', alignItems: 'center', gap: '15px' },
  inlineInput: { width: '100px', padding: '6px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' },
  section: { backgroundColor: '#fcfcfc', padding: '25px', borderRadius: '12px', border: '1px solid #eee', marginBottom: '30px' },
  form: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  input: { flex: '1', minWidth: '150px', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px' },
  submitBtn: { padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  editBtn: { padding: '4px 10px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' },
  saveBtn: { padding: '6px 12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', marginLeft: '8px', cursor: 'pointer' },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', borderBottom: '1px solid #eee', backgroundColor: '#fff', marginBottom: '8px', borderRadius: '6px' },
  itemText: { fontSize: '16px', marginRight: '10px' },
  badge: { fontSize: '12px', backgroundColor: '#e0e0e0', padding: '3px 8px', borderRadius: '12px', color: '#555' },
  expenseAmount: { fontWeight: 'bold', color: '#c62828' },
  deleteBtn: { background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '16px', transition: 'color 0.2s' },

  // return (
  //   <section>
  //    <h1>The Treasury</h1>
  //   <div>
  //     <Row>
  //       <Col>
  //         <div>
  //           <ul>
  //             <p>Rent</p>
  //             <p>Electic</p>
  //             <p>Gas</p>
  //             <p>Internet</p>
  //             <p>Car Note</p>
  //             <p>Insurance</p>
  //             <p>Phone</p>
  //             <p>Subscriptions</p>
  //             <p>Other</p>
  //           </ul>
  //         </div>
  //       </Col>
  //       <Col>2   of 2</Col>
  //     </Row>
  //   </div>
  //   </section>
  // )
}

export default App


