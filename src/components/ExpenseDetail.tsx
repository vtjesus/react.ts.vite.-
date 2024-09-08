import { categories } from "../data/categories";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import {
  SwipeableList,
  LeadingActions,
  SwipeAction,
  SwipeableListItem,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import AmountDisplay from "./AmountDisplay";
import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
type ExpenseDetailProps = {
  expense: Expense;
};
export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

    const {dispatch} =  useBudget();

  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
  );

  const leadingActions = () => (
    <LeadingActions>
        <SwipeAction
            onClick={() => dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } })}
        >
            Обновить
        </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
        <SwipeAction
            onClick={() =>dispatch({type: 'remove-expense', payload: {id: expense.id}})}
            destructive={true}
        >
            Удалить
        </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem 
      maxSwipe={1}
      leadingActions={leadingActions()}
      trailingActions={trailingActions()} 
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex justify-between">
          <div className="flex gap-4">
            <div>
              <img
                src={`/icon_${categoryInfo.icon}.svg`}
                alt="icon spent"
                className="w-12 h-12"
              />
            </div>
            <div>
              <p>{expense.expenseName}</p>
              <p className="text-slate-600 text-sm">
                {formatDate(expense.date!.toString())}
              </p>
            </div>
          </div>
          <AmountDisplay amount={expense.amount} label="Потрачено" />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
