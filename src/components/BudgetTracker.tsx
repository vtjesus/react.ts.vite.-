import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import "react-circular-progressbar/dist/styles.css";
export default function BudgetTracker() {

const {state, totalExpenses,  remainingBudget, dispatch} = useBudget();
const percentage = +(totalExpenses / state.budget * 100).toFixed(2);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathColor: percentage == 100 ? "#DC2626" : "#4338ca",
          trailColor: "#d6d6d6",
          strokeLinecap: "round",
          textSize: 12,
          textColor: percentage == 100 ? "#DC2626" : "#4338ca",

        })}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
            <button
            type="button"
            className="bg-pink-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => dispatch( {type: 'reset-app'})}
            >
              Сбросить
            </button>

            <AmountDisplay 
              label='Бюджет'
              amount={state.budget}
            />
             <AmountDisplay 
              label='Доступный'
              amount={remainingBudget}
            />
             <AmountDisplay 
              label='Расходы'
              amount={totalExpenses}
            />
      </div>
    </div>
  )
}
