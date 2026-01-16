import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RedirectPage() {
  const session = await getServerSession(authOptions);

  console.log("SERVER SESSION:", session);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role === "admin") {
    redirect("/dashboard");
  }

  redirect("/home");
}
