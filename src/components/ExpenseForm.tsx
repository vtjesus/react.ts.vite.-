
import { categories } from "../data/categories"
import { ChangeEvent, useState, useEffect} from 'react';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { DraftExpense, Value } from "../types";
import { useBudget } from "../hooks/useBudget";
import { formatCurrency } from "../helpers"
export default function ExpenseForm(){
  const INITIAL_EXPENSE = {
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  };
  const [previousAmount, setPreviousAmount] = useState(0);
  const [expense, setExpense] = useState<DraftExpense>(INITIAL_EXPENSE)
  const {state, dispatch, remainingBudget} = useBudget()

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.find(currentExpense => currentExpense.id === state.editingId);
      if (editingExpense) {
        setExpense(editingExpense);
        setPreviousAmount(editingExpense.amount);
      }
    }
  }, [state.editingId, state.expenses]);

  const handleChangeDate = (value: Value) => {
    setExpense({ ...expense, date: value })
  }
  
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isAmount = ['amount'].includes(name);

    const sanitizedValue = isAmount ? value.replace(/\D/g, '') : value;
    setExpense({ ...expense, [name]: isAmount ? +sanitizedValue : sanitizedValue });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(expense).includes('')){
      setError('All fields are required')
      return
    }
    if (expense.amount > remainingBudget+ previousAmount) {
      setError('Amount exceeds remaining budget: ' + formatCurrency(remainingBudget + previousAmount))
      return
    }
    setError('')

    if(state.editingId){
      dispatch({ type: "update-expense", payload: { expense: {id: state.editingId, ...expense} } });
    }else{
      dispatch({ type: "add-expense", payload: { expense } });
    }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="flex flex-col gap-4">
        <legend className="uppercase text-center text-2xl font-bold border-b-4 border-blue-500 py-2 w-full">
         {state.editingId ? "Edit Expense" : "Add Expense"}
        </legend>
        <div className="flex flex-col gap-2">
          <label htmlFor="expenseName" className="text-xl">
          Название расхода
          </label>
          <input
            onChange={handleChange}
            value={expense.expenseName}
            type="text"
            id="expenseName"
            placeholder="Добавить название расхода"
            className="bg-slate-100 p-2"
            name="expenseName"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="text-xl">
          Сумма
          </label>
          <input
            onChange={handleChange}
            type="text"
            value={expense.amount === 0 ? '' : expense.amount}
            id="amount"
            placeholder="Добавить сумму расхода"
            className="bg-slate-100 p-2"
            name="amount"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-xl">
            Категория
          </label>

          <select
            onChange={handleChange}
            name="category"
            id="category"
            className="bg-slate-100 p-2"
            value={expense.category}
          >
            <option value="">Выберите Категорию</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-xl">
            Дата
          </label>
          <DatePicker
            value={expense.date}
            className="bg-slate-100 p-2"
            onChange={handleChangeDate}
          />
        </div>

        {error && (
          <div className="text-red-600 font-bold text-center">{error}</div>
        )}


        <input
          type="submit"
          className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg text-center"
          value={state.editingId ? 'Update' : 'Добавить'}
        />
      </fieldset>
    </form>
  )
}
