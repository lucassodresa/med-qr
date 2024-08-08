import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function MedicalHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical History</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="full-name">Full Name</Label>
            <Input id="full-name" />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="health-card">Health Card</Label>
            <Input id="health-card" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="tax-number">Tax Number</Label>
            <Input id="tax-number" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="id-number">ID Number</Label>
            <Input id="id-number" />
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
}
