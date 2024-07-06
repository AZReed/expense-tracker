import dayjs from "dayjs";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import TransactionItem from "@/components/TransactionItem";
import { TransactionResponse } from "@/types/Transaction";

const TransactionList = ({ data, error }: TransactionResponse) => {
  if (error) {
    return <p className="error">{error}</p>;
  }

  const prevPage = data?.previousPage ? `?page=${data?.currentPage - 1}` : '#'
  const currentPage = (data?.currentPage || 0) + 1
  const nextPage = data?.nextPage ? `?page=${data?.currentPage + 1}` : '#'

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
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href={prevPage} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">{currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href={nextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : "No transactions found"}
    </>
  );
}

export default TransactionList;
