import getIncomeExpense from "@/actions/getIncomeExpense";
import { formatCurrency } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

const IncomeExpense = async () => {
  const { income, expense, error } = await getIncomeExpense();

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="flex items-center justify-between">
      <div className="w-1/2">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-green-700">
              {formatCurrency(income as number) ?? 0}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-1/2">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-red-700">
              {formatCurrency(income as number) ?? 0}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default IncomeExpense;
