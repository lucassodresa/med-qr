import { redirect } from "next/navigation";

export default async function View() {
  return redirect("/records/edit/personal");
}
