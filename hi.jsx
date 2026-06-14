  <div>
      <h1>💰 Personal Budget Planner</h1>

      {/* Overview Cards */}
      <div>
        <div>
          <h3>Budget</h3>
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

        <div>
          <h3>Remaining</h3>
          <span>
            ${remainingBalance.toFixed(2)}
          </span>
        </div>

        <div>
          <h3>Total Spent</h3>
          <span>${totalSpent.toFixed(2)}</span>
        </div>
      </div>

      {/* Add Expense Section */}
      <div>
        <h2>Add New Expense</h2>
        <form onSubmit={handleAddExpense}>
          <input
            type="text"
            placeholder="What did you buy?"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount ($)"
            step="0.01"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
          />
          <select
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Housing">Housing</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit">Add Expense</button>
        </form>
      </div>

      {/* Expense History List */}
      <div>
        <h2>Expense History</h2>
        {expenses.length === 0 ? (
          <p>No transactions recorded yet.</p>
        ) : (
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id} >
                <div>
                  <strong >{expense.name}</strong>
                  <span >{expense.category}</span>
                </div>
                <div>
                  <span>-${expense.amount.toFixed(2)}</span>
                  <button onClick={() => handleDeleteExpense(expense.id)} aria-label="Delete item">
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>