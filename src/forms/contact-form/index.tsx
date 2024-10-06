"use client";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { CardContent, CardFooter } from "@/src/components/ui/card";
import { Container } from "@/src/components/container";
import { InputField } from "@/src/components/input-field";
import { useFormState } from "react-dom";
import { Button } from "@/src/components/ui/button";
import { EditAction } from "./edit-action";
import { SaveIcon } from "lucide-react";
import { Contact, contactSchema } from "@/src/schemas/contact";

interface ContactFormProps {
  initialValues?: Contact;
}

export const ContactForm = ({ initialValues }: ContactFormProps) => {
  const [lastResult, action] = useFormState(EditAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: { ...initialValues },

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactSchema });
    },
  });

  return (
    <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
      <CardContent>
        <div className="grid gap-3">
          <Container.WithOneColumn className="hidden">
            <InputField field={fields.healthCard} label="" />
          </Container.WithOneColumn>
          <Container.WithTwoColumns>
            <InputField field={fields.parent1Name} label="Parent 1 Name" />
            <InputField
              field={fields.parent1PhoneNumber}
              label="Parent 1 Phone Number"
            />
          </Container.WithTwoColumns>
          <Container.WithTwoColumns>
            <InputField field={fields.parent2Name} label="Parent 2 Name" />
            <InputField
              field={fields.parent2PhoneNumber}
              label="Parent 2 Phone Number"
            />
          </Container.WithTwoColumns>
        </div>
      </CardContent>

      <CardFooter className="border-t px-6 py-4 gap-2 justify-end">
        <Button className="gap-1">
          <SaveIcon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Save
          </span>
        </Button>
      </CardFooter>
    </form>
  );
};
