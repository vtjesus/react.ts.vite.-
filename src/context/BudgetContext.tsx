import {useReducer, createContext, Dispatch, ReactNode, useMemo} from 'react'
import { BudgetActions, BudgetState, budgetReducer, initialState } from '../reducers/budget-reducers'


type BudgetContextProps ={
    state: BudgetState
    dispatch:  Dispatch<BudgetActions>
     totalExpenses: number
     remainingBudget: number
}

type BudgetProviderProps ={
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)


export const BudgetProvider = ({children} : BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState)
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => total + expense.amount, 0), [state.expenses]);
    const remainingBudget = useMemo(() => state.budget - totalExpenses, [state.budget, totalExpenses]);
    return (
        <BudgetContext.Provider value={{
            state,
            dispatch,
            totalExpenses,
            remainingBudget,
        }}>
            {children}
        </BudgetContext.Provider>
    )
}