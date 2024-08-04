import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
const signInWithGoogle = async () => {
  "use server";

  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${headers().get("origin")}/auth/callback`,
    },
  });

  if (error) return redirect("/login?message=Could not authenticate user");

  return redirect(data.url);
};

export default function Login() {
  return (
    <div>
      <form>
        <SubmitButton formAction={signInWithGoogle} pendingText="Signing In...">
          Login with Google
        </SubmitButton>
      </form>
    </div>
  );
}
