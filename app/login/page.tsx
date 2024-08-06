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
    <>
      <main className="w-full h-screen lg:grid lg:grid-cols-2">
        <div className="grid items-center justify-center px-4 md:px-6">
          <div className="grid gap-8">
            <div className="grid gap-8">
              <h1 className="text-5xl font-bold">Welcome to MedQR</h1>
              <p className="text-balance text-muted-foreground">
                Access your medical history quickly and securely, wherever you
                are. In case of an emergency, provide your essential information
                instantly with a simple QR code scan.
              </p>
            </div>
            <form>
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
          <Image
            src={loginCoverPhoto}
            alt="Image"
            sizes="50vw"
            priority={true}
          />
        </div>
      </main>
    </>
  );
}
