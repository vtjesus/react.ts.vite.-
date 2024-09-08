import { useState, useMemo } from "react";
import { ChangeEvent } from "react";
import { useBudget } from "../hooks/useBudget";
export default function BudgetForm() {
    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      let string = e.target.value;
      string = string.replace(/^0+/, "").replace(/\D/g, "");
      const number = parseInt(string);
      if (isNaN(number)) {
        setBudget(0);
      } else {
        setBudget(number);
      }
    };
  
    const isValid = useMemo(() => {
      return  budget <= 0;
    }, [budget]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch({ type: "add-budget", payload: { budget } });
      
    }

  return (
    <form action="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Бюджет
        </label>
        <input
          type="text"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="Введите ваш бюджет"
          name="budget"
          id="budget"
          onChange={handleChange}
          value={budget !== 0 ? budget : ""}
        />
      </div>
      <input
        type="submit"
        value="Отправить"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white uppercase font-bold text-center  disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isValid}
      />
    </form>
  );
}
