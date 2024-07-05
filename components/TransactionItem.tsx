"use client";
import { toast } from "react-toastify";
import { Card } from "@/components/ui/card";

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
    <li>
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex">
            <div>icon</div>
            <div className="flex flex-col">
              <div style={{ fontWeight: 'bold' }}>
                {transaction.text}
              </div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                {new Date(transaction.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div style={{ fontWeight: 'bold' }}>
              {sign}{formatCurrency(Math.abs(transaction.amount)) ?? 0}
            </div>
            <div className="ml-4">x</div>
          </div>
        </div>
        {/* <button className="delete-btn" onClick={() => handleDeleteTransaction(transaction.id)}>x</button> */}
      </Card>
    </li>
  );
}

export default TransactionItem;
