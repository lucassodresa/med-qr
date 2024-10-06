"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { createClient } from "@/src/utils/supabase/server";
import { personalSchema } from "@/src/schemas/personal";

export const createAction = async (_: unknown, formData: FormData) => {
  const { status, reply, payload } = parseWithZod(formData, {
    schema: personalSchema,
  });

  if (status !== "success") {
    return reply();
  }
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const createPersonalPromise = supabase.from("personal_records").insert({
    name: payload.name,
    id_number: payload.idNumber,
    tax_number: payload.taxNumber,
    health_card: payload.healthCard,
    blood_type: payload.bloodType,
    gender: payload.gender,
    date_of_birth: payload.dateOfBirth,
    owner_id: user?.id,
  });

  const createContactPromise = supabase.from("contact_records").insert({
    health_card: payload.healthCard,
    owner_id: user?.id,
  });

  const [createPersonal, createContact] = await Promise.all([
    createPersonalPromise,
    createContactPromise,
  ]);

  if (createPersonal.error || createContact.error) {
    createPersonal.error &&
      console.error("Create Personal", createPersonal.error);

    createContact.error && console.error("Create Contact", createContact.error);

    return reply({ formErrors: ["API error"] });
  }

  return redirect(`/records/edit/${payload.healthCard}/personal`);
};
