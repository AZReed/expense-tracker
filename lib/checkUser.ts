import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export async function checkUser() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userId = user.id;
  const userData = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (userData) {
    return userData;
  }
  console.log("*** Creating user ***", userData);
  const newUser = await db.user.create({
    data: {
      clerkUserId: userId,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
}
