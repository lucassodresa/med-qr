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
  idNumber: z.string(),
  dateOfBirth: z.string(),
  taxNumber: z.string(),
  bloodType: z.enum(bloodTypeEnum),
  gender: z.enum(genderEnum),
  healthCard: z.string(),
});
