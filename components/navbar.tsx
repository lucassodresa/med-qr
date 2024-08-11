import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

type NavbarProps = {
  isAuthenticated: boolean;
};

export const Navbar = ({ isAuthenticated }: NavbarProps) => {
  return (
    <>
      <nav
        className={cn(
          { hidden: isAuthenticated },
          "flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
        )}
      >
        <Logo />
      </nav>

      {isAuthenticated && (
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
              <Logo />
            </nav>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};
