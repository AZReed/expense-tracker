"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
    });

    const amounts = transactions.map((transaction) => {
      return transaction.amount;
    });

    const income = amounts
      .filter((amount) => amount > 0)
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);

    const expense = amounts
      .filter((amount) => amount < 0)
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);

    return { income, expense: Math.abs(expense) };
  } catch (error) {
    return { error: "DB error" };
  }
}

export default getIncomeExpense;
