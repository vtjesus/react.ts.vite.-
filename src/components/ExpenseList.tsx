
import { useBudget } from "../hooks/useBudget"
import { useMemo } from "react"
import ExpenseDetail from "./ExpenseDetail"
export default function ExpenseList() {

    const {state} = useBudget()
    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])
    const filteredExpenses = state.currentCategory ? state.expenses.filter( expense => expense.category === state.currentCategory) : state.expenses
  return (
    <div className="bg-white shadow-lg rounded-lg mt-10">
        {isEmpty ? 
        <p className="text-center text-2xl text-gray-400 p-10">Нет расходов</p> :    
        <>
            <p className="text-gray-600 text-2xl font-bold text-center">
            Список расходов            </p>
            {filteredExpenses.map((expense) => (
               <ExpenseDetail key={expense.id} 
                expense={expense}
               />
            ))}
        </>
        }

    </div>
  )
}
