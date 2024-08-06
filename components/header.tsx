import { User } from "@supabase/supabase-js";
import { Navbar } from "./navbar";
import { AvatarInfo } from "./avatar-info";

export type HeaderProps = {
  user?: User;
};

export const Header = ({ user }: HeaderProps) => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Navbar isAuthenticated={!!user} />
      <AvatarInfo user={user} />
    </header>
  );
};
