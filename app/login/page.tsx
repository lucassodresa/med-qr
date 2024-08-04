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
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <SubmitButton
          formAction={signInWithGoogle}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
        >
          Login with Google
        </SubmitButton>
      </form>
    </div>
  );
}
