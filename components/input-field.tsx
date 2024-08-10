import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FieldMetadata } from "@conform-to/react";
import { InputError } from "./input-error";
import { cn } from "@/lib/utils";

type InputFieldProps = {
  label: string;
  field: FieldMetadata;
};

export const InputField = ({ label, field }: InputFieldProps) => {
  if (!field) return;

  const { name, initialValue = "", key, errors } = field;

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={name} className={cn({ "text-destructive": errors })}>
        {label}
      </Label>
      <Input
        key={key}
        id={name}
        name={name}
        defaultValue={initialValue as string}
      />
      <InputError>{errors}</InputError>
    </div>
  );
};
