"use server";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { TransactionResponse, TransactionFilters } from "@/types/Transaction";

async function getTransactions(filters: TransactionFilters): Promise<TransactionResponse> {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  const parsedPage = parseInt(filters?.page || '0');

  const page = parsedPage - 1;

  const take = 5;
  // const skip = filters?.page ? page * take : 0;
  const skip = page * take;
  // const skip = parsedPage * take;

  try {
    const [totalCount, transactions] = await db.$transaction([
      db.transaction.count({ where: { userId } }),
      db.transaction.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
        },
        take,
        skip
      })
    ]);

    return {
      data: {
        list: transactions,
        totalCount,
        currentPage: parsedPage,
        nextPage: totalCount > skip + take,
        previousPage: skip > 0
      }
    };
  } catch (error) {
    return { error: "Transactions could not be retrieved" };
  }
}

export default getTransactions;
