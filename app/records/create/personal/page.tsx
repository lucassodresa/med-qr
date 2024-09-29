import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Forms } from "@/src/forms";

export default function Personal() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal</CardTitle>
      </CardHeader>
      <Forms.Personal />
    </Card>
  );
}
