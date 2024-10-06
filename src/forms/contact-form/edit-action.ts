"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { createClient } from "@/src/utils/supabase/server";
import { contactSchema } from "@/src/schemas/contact";

export const EditAction = async (_: unknown, formData: FormData) => {
  const { status, reply, payload } = parseWithZod(formData, {
    schema: contactSchema,
  });

  if (status !== "success") {
    return reply();
  }
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("contact_records")
    .update({
      parent1_name: payload.parent1Name,
      parent1_phone_number: payload.parent1PhoneNumber,
      parent2_name: payload.parent2Name,
      parent2_phone_number: payload.parent2PhoneNumber,
      owner_id: user?.id,
    })
    .match({ health_card: payload.healthCard });

  if (error) {
    console.error(error);
    return reply({ formErrors: ["API error"] });
  }
};
