import { redirect } from "next/navigation";

export default async function Records() {
  return redirect("/records/create/personal-identification");
}
