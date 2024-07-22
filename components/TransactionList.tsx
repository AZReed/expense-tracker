'use client'

import { useEffect, useState } from "react";
import dayjs from "dayjs";

import getTransactions from "@/actions/getTransactions";
import PaginationControls from "@/components/PaginationControls";
import { TransactionResponse } from "@/types/Transaction";
import TransactionItem from "@/components/TransactionItem";

const TransactionList = ({ data: transactionData }: TransactionResponse) => {
  const [page, setPage] = useState<number | undefined>(transactionData?.currentPage);
  const [data, setData] = useState<TransactionResponse['data']>(transactionData);

  useEffect(() => {
    if (data?.currentPage === page) return;

    getTransactions({ page: page?.toString() }).then(({ data }) => {
      setPage(data?.currentPage);
      setData(data);
    });

    console.log('page changed', page)
  }, [page]);

  const onPaginationChange = (page: number | undefined) => {
    setPage(page);
  }

  return (
    <>
      <div className="font-bold">{dayjs().format("MMMM DD YYYY")}</div>
      <ul className="flex flex-col gap-4">
        {data?.list?.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
      <PaginationControls data={data} onPaginationChange={onPaginationChange} />
    </>
  );
}

export default TransactionList;
