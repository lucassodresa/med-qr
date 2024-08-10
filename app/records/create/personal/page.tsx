"use client";
import { ContainerRow } from "@/components/container-row";
import { DateField } from "@/components/date-field";
import { InputField } from "@/components/input-field";
import { SelectField } from "@/components/select-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "@conform-to/react";
import { personalSchema } from "./schema";
import { parseWithZod } from "@conform-to/zod";
import { login } from "./action";
import { useFormState } from "react-dom";
import { bloodTypeOptions, genderOptions } from "@/lib/constants";

export default function Personal() {
  const [lastResult, action] = useFormState(login, undefined);
  const [form, fields] = useForm({
    lastResult,
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: personalSchema });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal</CardTitle>
      </CardHeader>
      <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
        <CardContent>
          <div className="grid gap-4">
            <ContainerRow columns={2}>
              <InputField field={fields.name} label="Name" />
              <InputField field={fields.idNumber} label="ID Number" />
            </ContainerRow>

            <ContainerRow columns={2}>
              <DateField name="date-of-birth" label="Date of Birth" />
              <InputField field={fields.taxNumber} label="Tax Number" />
            </ContainerRow>

            <ContainerRow columns={2}>
              <ContainerRow columns={2}>
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
              </ContainerRow>
              <InputField field={fields.healthCard} label="Health Card" />
            </ContainerRow>
          </div>
        </CardContent>

        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
