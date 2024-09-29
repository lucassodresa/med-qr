import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";

const signOut = async () => {
  "use server";

  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export type AvatarInfoProps = {
  user?: User;
};

export const AvatarInfo = ({ user }: AvatarInfoProps) => {
  if (!user) return null;

  return (
    <div className="flex items-center ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src={user.user_metadata.avatar_url} />
              <AvatarFallback>
                {user.user_metadata.name
                  .split(" ")
                  .slice(0, 2)
                  .map((name: string) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user.user_metadata.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <form action={signOut}>
            <button className="w-full">
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
