import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Forms } from "@/src/forms";
import { createClient } from "@/src/utils/supabase/server";

export default async function Personal({
  params,
}: {
  params: { healthCard: string };
}) {
  const supabase = createClient();
  const { data: record } = await supabase
    .from("personal-records")
    .select(
      "name, id_number, tax_number, health_card, gender, blood_type, date_of_birth"
    )
    .eq("health_card", params.healthCard)
    .maybeSingle();

  if (!record) return;

  const {
    name,
    id_number,
    tax_number,
    health_card,
    gender,
    blood_type,
    date_of_birth,
  } = record;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal</CardTitle>
      </CardHeader>
      <CardContent>
        <Forms.Personal
          initialValues={{
            name,
            idNumber: id_number,
            taxNumber: tax_number,
            healthCard: health_card,
            bloodType: blood_type,
            gender,
            dateOfBirth: date_of_birth,
          }}
        />
      </CardContent>
    </Card>
  );
}
