import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Forms } from "@/src/forms";
import { createClient } from "@/src/utils/supabase/server";

export default async function Contact({
  params,
}: {
  params: { healthCard: string };
}) {
  const supabase = createClient();
  const { data: record } = await supabase
    .from("contact_records")
    .select(
      "parent1_name, parent1_phone_number, parent2_name, parent2_phone_number"
    )
    .eq("health_card", params.healthCard)
    .maybeSingle();

  if (!record) return;

  const {
    parent1_name,
    parent1_phone_number,
    parent2_name,
    parent2_phone_number,
  } = record;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact</CardTitle>
      </CardHeader>
      <CardContent>
        <Forms.Contact
          initialValues={{
            parent1Name: parent1_name,
            parent1PhoneNumber: parent1_phone_number,
            parent2Name: parent2_name,
            parent2PhoneNumber: parent2_phone_number,
            healthCard: params.healthCard,
          }}
        />
      </CardContent>
    </Card>
  );
}
