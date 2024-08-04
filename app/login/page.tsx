import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { SubmitButton } from "./submit-button";
import loginCoverPhoto from "@/public/images/login-cover-photo.webp";

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
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="grid gap-4">
            <SubmitButton
              formAction={signInWithGoogle}
              pendingText="Signing In..."
            >
              Login with Google
            </SubmitButton>
          </form>
        </div>
      </div>
      <div className="hidden  lg:block overflow-hidden">
        <Image src={loginCoverPhoto} alt="Image" sizes="50vw" priority={true} />
      </div>
    </div>
  );
}
