"use client";
import { toast } from "react-toastify";

import { Transaction } from "@/types/Transaction";
import { formatCurrency } from "@/lib/utils";
import deleteTransaction from "@/actions/deleteTransaction";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const sign = transaction.amount > 0 ? "+" : "-";

  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this transaction?");

    if (!confirmed) {
      return;
    }

    const result = await deleteTransaction(transaction.id);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Transaction deleted");
    }
  };

  return (
    <li className={transaction.amount > 0 ? "plus" : "minus"}>
      {transaction.text}
      <span>
        {sign}{formatCurrency(Math.abs(transaction.amount)) ?? 0}
      </span>
      <button className="delete-btn" onClick={() => handleDeleteTransaction(transaction.id)}>x</button>
    </li>
  );
}

export default TransactionItem;