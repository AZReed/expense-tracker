"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResponse {
  data?: TransactionData;
  error?: string;
}

async function addTransaction(
  textValue: string,
  amountValue: string | number
): Promise<TransactionResponse> {
  if (!textValue || textValue === "" || !amountValue || amountValue === "") {
    return {
      error: "Name and amount are required",
    };
  }

  const text: string = textValue?.toString() as string;
  const amount: number = parseFloat(amountValue?.toString() as string);

  const { userId } = auth();
  // log.debug(`Adding transaction for user ${userId}`);
  if (!userId) {
    return {
      error: "User not found",
    };
  }

  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    revalidatePath("/");

    return { data: transactionData };
  } catch (error) {
    return { error: "Transaction could not be added" };
  }
}

export default addTransaction;
