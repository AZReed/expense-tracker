"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

async function getUserBalance(): Promise<{ balance?: number; error?: string }> {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transaction = await db.transaction.findMany({
      where: {
        userId,
      },
    });

    const balance = transaction.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

    return { balance };
  } catch (error) {
    return { error: "Balance could not be retrieved" };
  }
}

export default getUserBalance;
