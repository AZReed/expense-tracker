import getTransactions from "@/actions/getTransactions";
import { TransactionResponse } from "@/types/Transaction";
import TransactionItem from "@/components/TransactionItem";

const TransactionList = async () => {
  const { transactions, error }: TransactionResponse = await getTransactions();

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions?.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
}

export default TransactionList;