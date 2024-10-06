"use server";

import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";

export const deleteAction = async (healthCard: string) => {
  const supabase = createClient();
  await supabase
    .from("personal_records")
    .delete()
    .match({ health_card: healthCard });

  return redirect("/records");
};
