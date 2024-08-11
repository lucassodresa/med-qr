import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
};

const WithTwoColumns = ({ children }: ContainerProps) => (
  <div className="grid gap-x-1.5 gap-y-3 sm:grid-cols-2">{children}</div>
);
const WithOneColumn = ({ children }: ContainerProps) => (
  <div className="grid gap-1.5">{children}</div>
);

export const Container = { WithOneColumn, WithTwoColumns };
