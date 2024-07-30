import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session?.user) return redirect("/api/auth/signin");

  console.log(session);

  return (
    <main>
      <h1>Welcome, {session.user.name}</h1>
    </main>
  );
}
