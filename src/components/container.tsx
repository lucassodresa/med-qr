import { cn } from "@/src/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const WithTwoColumns = ({ children }: ContainerProps) => (
  <div className="grid gap-x-1.5 gap-y-3 sm:grid-cols-2">{children}</div>
);
const WithOneColumn = ({ children, className }: ContainerProps) => (
  <div className={cn("grid gap-1.5", className)}>{children}</div>
);

export const Container = { WithOneColumn, WithTwoColumns };
