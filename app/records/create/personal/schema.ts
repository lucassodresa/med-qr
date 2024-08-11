import { bloodTypeOptions, genderOptions } from "@/lib/constants";
import { z } from "zod";

const bloodTypeEnum = bloodTypeOptions.map(({ value }) => value) as [
  string,
  ...string[]
];
const genderEnum = genderOptions.map(({ value }) => value) as [
  string,
  ...string[]
];

export const personalSchema = z.object({
  name: z.string(),
  idNumber: z
    .string()
    .regex(
      /(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/,
      "ID Number must be valid"
    ),
  taxNumber: z
    .string()
    .regex(/(^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$)/, "Tax Number must be valid"),
  healthCard: z
    .string()
    .regex(/(^\d{3}\s?\d{4}\s?\d{4}\s?\d{4}$)/, "Tax Number must be valid"),
  bloodType: z.enum(bloodTypeEnum),
  gender: z.enum(genderEnum),
  dateOfBirth: z.string(),
});
