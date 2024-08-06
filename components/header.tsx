import Link from "next/link";
import { Menu, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js";

const signOut = async () => {
  "use server";

  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export type HeaderProps = {
  user?: User;
};

export const Header = ({ user }: HeaderProps) => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <HeartPulse className="h-6 w-6" />

          <span>MedQR</span>
        </Link>
        {user && (
          <>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Records
            </Link>

            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              QR codes
            </Link>
          </>
        )}
      </nav>

      {user && (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <HeartPulse className="h-6 w-6" />
                <span>MedQR</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Records
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                QR codes
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      )}
      {user && (
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
      )}
    </header>
  );
};
