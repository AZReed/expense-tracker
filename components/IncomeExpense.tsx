import getIncomeExpense from "@/actions/getIncomeExpense";
import { formatCurrency } from "@/lib/utils";

const IncomeExpense = async () => {
  const { income, expense, error } = await getIncomeExpense();

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">{formatCurrency(income as number) ?? 0}</p>
      </div>
      <div>
        <h4>Expenses</h4>
        <p className="money minus">{formatCurrency(expense as number) ?? 0}</p>
      </div>
    </div>
  );
}

export default IncomeExpense;
