import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function CategoryFilter() {
    const { dispatch } = useBudget();

    const handleOnChange = (e :ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: 'filter-category',
            payload: {id: e.target.value}
        })
    }

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form>
        <div className="flex items-center gap-2 flex-col md:flex-row">
          <label htmlFor="category">Фильтровать расходы по категории</label>
          <select id="category"
            onChange={handleOnChange}
            className="bg-slate-100 p-3 flex-1 rounded "
          >
            <option value="">-- Все --</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
      </form>
    </div>
  );
}
