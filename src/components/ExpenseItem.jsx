import React from 'react';

const ExpenseItem = React.memo(({ expense, onDelete, currency, exchangeRate }) => {
    // A mock date placeholder since the API payload only has title/amount
    const mockDate = "Recent Transaction";

    return (
        <li className="expense-item">
            <div className="expense-info">
                <div className="expense-icon-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div className="expense-details">
                    <span className="expense-title">{expense.title}</span>
                    <span className="expense-date">{mockDate}</span>
                </div>
            </div>

            <span className="expense-amount">{currency}{(Number(expense.amount) * exchangeRate).toFixed(2)}</span>

            <button
                className="btn-delete"
                onClick={() => onDelete(expense.id)}
                aria-label={`Delete ${expense.title}`}
                title="Delete expense"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </li>
    );
});

export default ExpenseItem;
