import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Records", href: "/records" },
  { name: "QR codes", href: "qr-codes" },
];

const navItems = NAV_ITEMS.map(({ name, href }) => (
  <Link
    key={href}
    className="text-muted-foreground transition-colors hover:text-foreground"
    href={href}
  >
    {name}
  </Link>
));

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
        {isAuthenticated && navItems}
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
              {navItems}
            </nav>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};
