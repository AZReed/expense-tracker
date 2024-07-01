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
  formData: FormData
): Promise<TransactionResponse> {
  const textValue = formData.get("text");
  const amountValue = formData.get("amount");

  const errors: string[] = [];
  formData.forEach((value, key) => {
    if (!value || value === "") {
      errors.push(key);
    }
  });

  if (errors.length > 0) {
    return {
      error: `Missing values: ${errors.join(", ")}`,
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
