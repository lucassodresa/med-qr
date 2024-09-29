"use client";
import { Button } from "@/src/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

export interface DeleteActionButtonProps {
  onDelete: () => Promise<void>;
}

export const DeleteActionButton = ({ onDelete }: DeleteActionButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant={"destructive"}
      className="gap-1"
      disabled={isPending}
      onClick={() => startTransition(() => onDelete())}
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Delete
      </span>
    </Button>
  );
};
