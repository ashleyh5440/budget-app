       <section className="fireflies-container" ref={fireFliesContainerRef}>
      {Array.from({ length: totalFireFlies }, (_, index) => (
                    <div
                        key={index}
                        className="dot"
                    />
                ))}
      <h1><span className="logo">🍪</span> The Cookie Jar <span className="logo">🍪</span></h1>
      <div className="container">
        <h4>Monthly Budget</h4>
        <p>${budget.toFixed(2)}</p>

        <div className="chart-box">
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          
          />

        </div>
        <h4>Current Balance</h4>
          <input
          className="current-balance-box"
            type="number"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(Number(e.target.value))}
          />
        {/* <p>${currentBalance.toFixed(2)}</p> */}
      </div>
      {/* insert bill */}
      <Row id="drop-box">
        <h4 style={{marginTop: "45px"}}>Add a bill</h4>
        <Dropdown>
          <Dropdown.Toggle id="bill-type-btn" variant="success">
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
                className="other-ex-name"
                type="text"
                placeholder="Expense Name"
                value={otherExpense}
                onChange={(e) => setOtherExpense(e.target.value)}
              />
            )}
            <input
              className="other-ex-amount"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="add-expense-btn" onClick={addExpense}>Add Expense</button>
          </div>
        )}
      </Row>
      {/* calender */}
      <Row id="calendar-box">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
          />
          <input
            className="bill-date"
            type="text"
            value={billName}
            onChange={(e) => setBillName(e.target.value)}
            placeholder="bill name"
          />
          <button id="add-bill-btn" onClick={addBill}>Add Bill</button>
          <ul style={{marginTop: "15px"}}>
            {bills.map((bill, index) => (
              <li style={{color: "white"}} key={index}>
                {bill.name} — Due:{" "}
                {bill.dueDate.toLocaleDateString()}
                <button style={{width: "45px !important"}} className="dlt-bill-btn" onClick={() => setBills(bills.filter((_, i) => i !== index))}>X</button>
              </li>
            ))}
          </ul>
      </Row>
      {/* expenses list */}
      <Row id="expenses-box">
        <div style={{ marginTop: "20px", width: "80%", borderTop: "2px solid white" }}>
          <p style={{ marginTop: "10px"}}>Expenses</p>
          {expenses.map((expense) => (
            <div
              key={expense.id}
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "10px",
                alignItems: "center",
                marginBottom: "2px solid white",
              }}
            >
              <span className="expense" style={{color: "white"}}>{expense.type}</span>
              <input className="expense-amount"
                type="number"
                value={expense.amount}
                onChange={(e) =>
                  updateExpense(expense.id, e.target.value)
                }
              />
              <button className="dlt-expense-btn" onClick={() => deleteExpense(expense.id)}>X</button>
              </div>
            ))}
        </div>
      </Row>
    </section> 
    
    
    
    
    
    
    const fireFliesContainerRef = useRef(null);
    const totalFireFlies = 50;

    useEffect(() => {

        // Firefly animation
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

