"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { TransactionResponse } from "@/types/Transaction";

async function getTransactions(): Promise<TransactionResponse> {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(transactions);

    return { transactions };
  } catch (error) {
    return { error: "Transactions could not be retrieved" };
  }
}

export default getTransactions;
