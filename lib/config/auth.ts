import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";

export const getServerSessionData = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw Error("Session not available");
  }

  return session.user;
};
