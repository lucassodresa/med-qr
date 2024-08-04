import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const signOut = async () => {
  "use server";

  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div>
      Hey, {user.email}!
      <form action={signOut}>
        <button>Logout</button>
      </form>
    </div>
  ) : (
    <Link href="/login">Login</Link>
  );
}
