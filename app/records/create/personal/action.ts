"use server";

import { parseWithZod } from "@conform-to/zod";
import { personalSchema } from "./schema";

export async function login(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: personalSchema,
  });

  console.log(submission);

  if (submission.status !== "success") {
    return submission.reply();
  }
}
