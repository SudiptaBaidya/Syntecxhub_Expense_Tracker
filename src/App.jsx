import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseList from './components/ExpenseList.jsx';

const exchangeRates = {
    '$': 1,
    '€': 0.92,
    '£': 0.79,
    '₹': 83.0,
    '¥': 150.0
};

function App() {
    const [expenses, setExpenses] = useState(() => {
        // Retrieve local storage initially, or fallback to an empty array
        const savedExpenses = localStorage.getItem('expense_tracker_data');
        if (savedExpenses) {
            return JSON.parse(savedExpenses);
        } else {
            return [];
        }
    });
    const [isLoading, setIsLoading] = useState(false); // No loading state needed since localStorage is synchronous

    // New States for Customization
    const [currency, setCurrency] = useState('$');
    const [theme, setTheme] = useState('indigo'); // options: indigo, emerald, rose, amber

    // Apply theme to the whole document body so CSS variables activate
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    // Save to LocalStorage whenever 'expenses' state changes
    useEffect(() => {
        localStorage.setItem('expense_tracker_data', JSON.stringify(expenses));
    }, [expenses]);

    const totalExpense = useMemo(() => {
        const baseTotal = expenses.reduce((total, expense) => total + Number(expense.amount), 0);
        return baseTotal * exchangeRates[currency];
    }, [expenses, currency]);

    const deleteExpense = useCallback((id) => {
        setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== id));
    }, []);

    const addExpense = (title, amount) => {
        const newExpense = {
            id: Date.now().toString(),
            title,
            // Store in base USD equivalent so that switching currencies scales properly
            amount: Number(amount) / exchangeRates[currency]
        };
        setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
    };

    return (
        <div className="app-container">
            {/* Settings Bar */}
            <div className="settings-bar">
                <div className="settings-group">
                    <span className="settings-label">Currency:</span>
                    <select
                        className="settings-select"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="$">US Dollar ($)</option>
                        <option value="€">Euro (€)</option>
                        <option value="£">British Pound (£)</option>
                        <option value="₹">Indian Rupee (₹)</option>
                        <option value="¥">Japanese Yen (¥)</option>
                    </select>
                </div>

                <div className="settings-group">
                    <span className="settings-label">Theme:</span>
                    <div className="theme-dots">
                        <button aria-label="Indigo theme" className={`theme-dot theme-indigo ${theme === 'indigo' ? 'active' : ''}`} onClick={() => setTheme('indigo')}></button>
                        <button aria-label="Emerald theme" className={`theme-dot theme-emerald ${theme === 'emerald' ? 'active' : ''}`} onClick={() => setTheme('emerald')}></button>
                        <button aria-label="Rose theme" className={`theme-dot theme-rose ${theme === 'rose' ? 'active' : ''}`} onClick={() => setTheme('rose')}></button>
                        <button aria-label="Amber theme" className={`theme-dot theme-amber ${theme === 'amber' ? 'active' : ''}`} onClick={() => setTheme('amber')}></button>
                    </div>
                </div>
            </div>

            <header className="header">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                    <path d="M7 15h.01" />
                    <path d="M11 15h2" />
                </svg>
                <h1>Expense Tracker</h1>
            </header>

            <section className="total-expense">
                <h2>Total Balance</h2>
                <div className="amount">{currency}{totalExpense.toFixed(2)}</div>
            </section>

            <ExpenseForm onAddExpense={addExpense} currency={currency} />

            {isLoading ? (
                <div className="loading">
                    <div className="spinner"></div>
                    <span>Loading securely...</span>
                </div>
            ) : (
                <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} currency={currency} exchangeRate={exchangeRates[currency]} />
            )}
        </div>
    );
}

export default App;
