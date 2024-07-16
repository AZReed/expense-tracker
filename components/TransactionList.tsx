import dayjs from "dayjs";

import { TransactionResponse } from "@/types/Transaction";
import TransactionItem from "@/components/TransactionItem";
import PaginationControls from "@/components/PaginationControls";

const TransactionList = ({ data, error }: TransactionResponse) => {
  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      <div className="font-bold">{dayjs().format("MMMM DD YYYY")}</div>
      {data?.list?.length ? (
        <div>
          <ul className="flex flex-col gap-4">
            {data?.list?.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </ul>
          <PaginationControls data={data} />
        </div>
      ) : "No transactions found"}
    </>
  );
}

export default TransactionList;
