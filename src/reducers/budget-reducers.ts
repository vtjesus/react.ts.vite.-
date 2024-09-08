import { v4 as uuidv4 } from 'uuid';
import { Category, DraftExpense, Expense } from "../types";

export type BudgetActions = 
    { type: 'add-budget'; payload: { budget: number } } |
    {type: 'add-expense'; payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'open-modal'} |
    { type: 'close-modal'} |
    {type: 'get-expense-by-id', payload: { id: Expense['id'] } } | 
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'reset-app'} |
    { type: 'filter-category', payload: { id: Category['id'] } };

export type BudgetState = {
    budget: number
    expenses : Expense[],
    modalOpen: boolean,
    editingId : Expense['id']
    currentCategory: Category['id']
};

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget');
    return localStorageBudget ? +localStorageBudget : 0;
}

const localStorageExpenses = () : Expense[] => {
    const expenses = localStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
}

export const initialState: BudgetState = { 
    budget: initialBudget(),
    expenses: localStorageExpenses(), 
    modalOpen: false,
    editingId: '',
    currentCategory: '',
    };


export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions,
    
): BudgetState => {
    switch (action.type) {
        case 'add-budget':
            return {
                ...state,
                budget: action.payload.budget !== null ? action.payload.budget : state.budget,
            };

        case 'add-expense': {
            const expense: Expense = {
                id: uuidv4(),
                ...action.payload.expense,
            };
            return {
                ...state,
                modalOpen: false,
                expenses: [...state.expenses, expense],
                editingId: '',
            };
        }
        case 'remove-expense':
            return {
                ...state,
                expenses: state.expenses.filter((expense) => expense.id !== action.payload.id),
            };

        case "get-expense-by-id":
            return {
               ...state,
                editingId: action.payload.id,
                modalOpen:true,
            };

        case "update-expense":
            return {
                ...state,
                expenses: state.expenses.map((expense) => expense.id === state.editingId ? action.payload.expense : expense),
                modalOpen: false,
                editingId: '',
            }
        case 'open-modal':
            return {
                ...state,
                modalOpen: true,
            };
        case 'close-modal':
            return {
                ...state,
                modalOpen: false,
                editingId: '',
            };

        case'reset-app':
            localStorage.removeItem('budget');
            localStorage.removeItem('expenses');
            return initialState;
        case 'filter-category':
            return {
               ...state,
                currentCategory: action.payload.id,
            }

        default:
            return state;
    }
};
