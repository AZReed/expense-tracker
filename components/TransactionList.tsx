// import { Heading } from '@radix-ui/themes';

import getTransactions from "@/actions/getTransactions";
// import { TransactionResponse } from "@/types/Transaction";
import TransactionItem from "@/components/TransactionItem";

const TransactionList = async () => {
  const { transactions, error } = await getTransactions();

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      <h1>History</h1>
      <ul className="flex flex-col gap-4">
        {transactions?.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
}

export default TransactionList;
