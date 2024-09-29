"use client";
import { Personal, personalSchema } from "@/src/schemas/personal";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { CardContent, CardFooter } from "@/src/components/ui/card";
import { Container } from "@/src/components/container";
import { InputField } from "@/src/components/input-field";
import { DateField } from "@/src/components/date-field";
import { SelectField } from "@/src/components/select-field";
import { useFormState } from "react-dom";
import { bloodTypeOptions, genderOptions } from "@/src/lib/constants";
import { Button } from "@/src/components/ui/button";
import { createAction } from "./create-action";
import { updateAction } from "./update-action";
import { SaveIcon } from "lucide-react";
import { DeleteActionButton } from "@/src/components/delete-action-button";
import { deleteAction } from "./delete-action";

interface PersonalProps {
  initialValues?: Personal;
}

export const PersonalForm = ({ initialValues }: PersonalProps) => {
  const isEdit = !!initialValues;
  const [lastResult, action] = useFormState(
    isEdit ? updateAction : createAction,
    undefined
  );
  const [form, fields] = useForm({
    lastResult,
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: { ...initialValues },

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: personalSchema });
    },
  });

  return (
    <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
      <CardContent>
        <div className="grid gap-3">
          <Container.WithTwoColumns>
            <InputField field={fields.name} label="Name" />
            <InputField field={fields.idNumber} label="ID Number" />
          </Container.WithTwoColumns>

          <Container.WithTwoColumns>
            <DateField field={fields.dateOfBirth} label="Date of Birth" />
            <InputField field={fields.taxNumber} label="Tax Number" />
          </Container.WithTwoColumns>

          <Container.WithTwoColumns>
            <Container.WithTwoColumns>
              <SelectField
                field={fields.bloodType}
                label="Blood Type"
                placeholder="Select a blood type"
                selectItems={bloodTypeOptions}
              />
              <SelectField
                field={fields.gender}
                label="Gender"
                placeholder="Select a gender"
                selectItems={genderOptions}
              />
            </Container.WithTwoColumns>
            <InputField field={fields.healthCard} label="Health Card" />
          </Container.WithTwoColumns>
        </div>
      </CardContent>

      <CardFooter className="border-t px-6 py-4 gap-2 justify-end">
        {isEdit && (
          <DeleteActionButton
            onDelete={() => deleteAction(initialValues?.healthCard)}
          />
        )}
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
