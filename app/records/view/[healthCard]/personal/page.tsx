import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { bloodTypeOptions } from "@/src/lib/constants";
import { createClient } from "@/src/utils/supabase/server";

export default async function Personal({
  params,
}: {
  params: { healthCard: string };
}) {
  const supabase = createClient();
  const { data: record, error } = await supabase
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

  const bloodTypeLabel = bloodTypeOptions.find(
    ({ value }) => value === blood_type
  )?.label;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Name</dt>
            <dd>{name}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Date of Birth</dt>
            <dd>{date_of_birth}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Gender</dt>
            <dd>{gender}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Blood Type</dt>
            <dd>{bloodTypeLabel}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">ID Number</dt>
            <dd>{id_number}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Tax Number</dt>
            <dd>{tax_number}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Health Card</dt>
            <dd>{health_card}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
