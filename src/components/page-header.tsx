import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeft, PlusCircle, Trash2 } from "lucide-react";

type PageHeaderProps = {
  page: "create" | "view" | "edit" | "list";
};

const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const backButton = (
  <Button variant={"outline"} size="sm" className="h-8 gap-1" asChild>
    <Link href={"/records"}>
      <ArrowLeft className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Back</span>
    </Link>
  </Button>
);

const actionButtons = {
  create: backButton,
  view: null,
  edit: backButton,
  list: (
    <Button size="sm" className="h-8 gap-1" asChild>
      <Link href={"/records/create/personal"}>
        <PlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Create Record
        </span>
      </Link>
    </Button>
  ),
};

export const PageHeader = ({ page }: PageHeaderProps) => {
  const isList = page === "list";
  const title = isList ? "Records" : `${capitalizeFirstLetter(page)} Record`;

  return (
    <div className="flex items-center justify-between mx-auto w-full max-w-6xl gap-2">
      <div className="gap-4">
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>
      {actionButtons[page] && (
        <div className="flex items-center gap-2">{actionButtons[page]}</div>
      )}
    </div>
  );
};
