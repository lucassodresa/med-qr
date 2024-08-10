import { FieldMetadata, useInputControl } from "@conform-to/react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { personalSchema } from "@/app/records/create/personal/schema";
import { z } from "zod";
import { useRef } from "react";
import { InputError } from "./input-error";
import { cn } from "@/lib/utils";

type SelectFieldProps = {
  field: FieldMetadata<string, z.infer<typeof personalSchema>>;
  label: string;
  placeholder: string;
  selectItems: { value: string; label: string }[];
};

export const SelectField = ({
  field,
  label,
  placeholder,
  selectItems,
}: SelectFieldProps) => {
  if (!field) return;
  const { value, change, blur, focus } = useInputControl(field);
  const inputRef = useRef<HTMLButtonElement>(null);
  const { name, key, errors } = field;

  const handleOnValueChange = (value: string) => change(value);
  const handleOnOpenChange = (open: boolean) => !open && blur();
  const handleOnFocus = () => inputRef.current?.focus();

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={name} className={cn({ "text-destructive": errors })}>
        {label}
      </Label>

      <input className="sr-only" tabIndex={-1} onFocus={handleOnFocus} />
      <Select
        key={key}
        name={name}
        value={value}
        onValueChange={handleOnValueChange}
        onOpenChange={handleOnOpenChange}
        defaultValue=""
      >
        <SelectTrigger onFocus={focus} id={name} ref={inputRef}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem className="hidden" value={null} disabled />
            {selectItems.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <InputError>{errors}</InputError>
    </div>
  );
};
