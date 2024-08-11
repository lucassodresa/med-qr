import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { personalSchema } from "@/app/records/create/personal/schema";
import { FieldMetadata, useInputControl } from "@conform-to/react";
import { z } from "zod";
import { useRef } from "react";
import { InputError } from "./input-error";
import "react-day-picker/dist/style.css";

type DateFieldProps = {
  field: FieldMetadata<string, z.infer<typeof personalSchema>>;
  label: string;
};

export const DateField = ({ label, field }: DateFieldProps) => {
  const { value, change, blur, focus } = useInputControl(field);
  const inputRef = useRef<HTMLButtonElement>(null);
  const { name, key, errors, initialValue } = field;

  const handleOnFocus = () => inputRef.current?.focus();
  const handleOnSelect = (date: Date | undefined) => {
    blur();

    change(date?.toISOString());
  };
  const disabledDates = (date: Date) =>
    date > new Date() || date < new Date("1900-01-01");

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={name} className={cn({ "text-destructive": errors })}>
        {label}
      </Label>

      <input
        className="sr-only"
        tabIndex={-1}
        onFocus={handleOnFocus}
        name={name}
        defaultValue={initialValue}
      />
      <Popover>
        <PopoverTrigger asChild id={name} onFocus={focus} ref={inputRef}>
          <Button
            variant={"outline"}
            className={cn("font-normal", "text-muted-foreground")}
          >
            {value ? new Date(value).toLocaleDateString() : "Select a date"}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            key={key}
            mode="single"
            selected={new Date(value)}
            onSelect={handleOnSelect}
            disabled={disabledDates}
            initialFocus
            captionLayout="dropdown"
            fromDate={new Date("1900-01-01")}
            toDate={new Date()}
          />
        </PopoverContent>
      </Popover>
      <InputError>{errors}</InputError>
    </div>
  );
};
