import { redirect } from "next/navigation";

export default async function Create() {
  return redirect("/records/create/personal");
}
