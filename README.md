# Expense Tracker Web Application

Beginner-friendly expense tracker built with React.js using Functional Components and Hooks.

## Project Structure
- `src/main.jsx`: The application entry point.
- `src/index.css`: Contains clean, modern, and responsive styling for the tracker.
- `src/App.jsx`: The main container component that manages global state (expenses list) and initially fetches mock data.
- `src/components/ExpenseForm.jsx`: The form component to add a new expense.
- `src/components/ExpenseList.jsx`: The list container component that maps through the list of expenses.
- `src/components/ExpenseItem.jsx`: Individual component rendering a single expense item with a delete button.

## React Hooks Used
1. **useState (`App.jsx`, `ExpenseForm.jsx`)**
   - Used in `App.jsx` to store the array of expenses (`const [expenses, setExpenses] = useState([])`) and `isLoading`.
   - Used in `ExpenseForm.jsx` to handle the input fields logic for `title` and `amount`.

2. **useEffect (`App.jsx`, `ExpenseForm.jsx`)**
   - Used in `App.jsx` to fetch initial mock data from an API (JSONPlaceholder) when the component mounts. The empty dependency array `[]` ensures it only runs once.
   - Used in `ExpenseForm.jsx` to automatically focus the first input field as soon as the form mounts.

3. **useRef (`ExpenseForm.jsx`)**
   - Used to reference the specific title `<input>` element directly. We focus it on initial mount via `useEffect` and right after a user successfully submits a new expense.

4. **useMemo (`App.jsx`)**
   - Calculates the `totalExpense` out of the large array. By wrapping the reduce function in `useMemo`, we stop it from recalculating the sum on every render, and limit the calculation strictly to when the `expenses` array has changed.

5. **useCallback (`App.jsx`)**
   - Used for the `deleteExpense` function. Passing normal functions down as props causes child components to re-render. Memorizing the delete function with `useCallback` (combined with `React.memo` inside `ExpenseItem.jsx`) prevents unnecessary re-renders of the list items.

## How to Run

1. Open a terminal in this directory.
2. Run `npm install` to install all necessary dependencies.
3. Run `npm run dev` to start the application with Vite.
4. Open the `localhost` URL shown in your terminal (typically `http://localhost:5173/`) to view the application.
