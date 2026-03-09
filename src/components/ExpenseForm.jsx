import React, { useState, useRef, useEffect } from 'react';

function ExpenseForm({ onAddExpense, currency }) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const titleInputRef = useRef(null);

    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !amount || Number(amount) <= 0) {
            return;
        }
        onAddExpense(title, amount);
        setTitle('');
        setAmount('');
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    };

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="expense-title">Expense Title</label>
                <div className="input-wrapper">
                    <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    <input
                        type="text"
                        id="expense-title"
                        className="form-control"
                        placeholder="e.g. Groceries..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        ref={titleInputRef}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="expense-amount">Amount ({currency})</label>
                <div className="input-wrapper">
                    <span className="currency-symbol-input">{currency}</span>
                    <input
                        type="number"
                        id="expense-amount"
                        className="form-control"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        step="0.01"
                        min="0.01"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="btn-add"
                disabled={!title.trim() || !amount}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Expense
            </button>
        </form>
    );
}

export default ExpenseForm;
