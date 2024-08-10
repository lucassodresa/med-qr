import { cn } from "@/lib/utils";

type ContainerRowProps = {
  children: React.ReactNode;
  columns?: number;
};

export const ContainerRow = ({ columns, children }: ContainerRowProps) => {
  const columnClass = `sm:grid-cols-${columns}`;
  return (
    <div className={cn("grid gap-4", { [columnClass]: columns })}>
      {children}
    </div>
  );
};
