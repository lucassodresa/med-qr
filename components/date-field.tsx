import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";

type DateFieldProps = {
  name: string;
  label: string;
};

export const DateField = ({ name, label }: DateFieldProps) => {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("font-normal", "text-muted-foreground")}
          >
            <span>Pick a date</span>
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={new Date()}
            onSelect={() => {}}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
