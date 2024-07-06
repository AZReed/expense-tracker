"use client";
import { toast } from "react-toastify";
import { Card } from "@/components/ui/card";
import { LuCoffee } from "react-icons/lu";
import dayjs from "dayjs";

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
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded-lg mr-3"><LuCoffee color="#1a85ff" size={20} /></div>
            <div className="flex flex-col leading-4">
              <div className="font-bold">
                {transaction.text}
              </div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                {dayjs(transaction.createdAt).format('DD MMM YYYY')}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="font-bold">
              {sign}{formatCurrency(Math.abs(transaction.amount)) ?? 0}
            </div>
            <div className="bg-gray-50 rounded-lg p-2 ml-4 cursor-pointer" onClick={() => handleDeleteTransaction(transaction.id)}>x</div>
          </div>
        </div>
        {/* <button className="delete-btn" onClick={() => handleDeleteTransaction(transaction.id)}>x</button> */}
      </Card>
    </li>
  );
}

export default TransactionItem;
