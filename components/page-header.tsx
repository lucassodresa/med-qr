import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { VariantProps } from "class-variance-authority";

type PageHeaderProps = {
  title: string;
  link?: {
    href: string;
    text: string;
    icon: React.ReactNode;
  };
  button?: Pick<VariantProps<typeof buttonVariants>, "variant">;
};

export const PageHeader = ({
  title,
  link,
  button = { variant: "default" },
}: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between mx-auto w-full max-w-6xl gap-2">
      <div className="gap-4">
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>
      {link && (
        <Button
          variant={button.variant}
          size="sm"
          className="h-8 gap-1"
          asChild
        >
          <Link href={link.href}>
            {link.icon}
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {link.text}
            </span>
          </Link>
        </Button>
      )}
    </div>
  );
};
