"use server";

import { parseWithZod } from "@conform-to/zod";
import { personalSchema } from "./schema";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(_: unknown, formData: FormData) {
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

  const { error } = await supabase.from("personal-records").insert({
    name: payload.name,
    id_number: payload.idNumber,
    tax_number: payload.taxNumber,
    health_card: payload.healthCard,
    blood_type: payload.bloodType,
    gender: payload.gender,
    date_of_birth: payload.dateOfBirth,
    owner_id: user?.id,
  });

  if (error) {
    console.error(error);
    return reply({ formErrors: ["API error"] });
  }

  return redirect("/records");
}
