type InputErrorProps = {
  children: React.ReactNode;
};

export const InputError = ({ children }: InputErrorProps) => {
  return <p className="text-sm font-medium text-destructive">{children}</p>;
};
