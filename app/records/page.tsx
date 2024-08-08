import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";

const RECORDS = [
  {
    name: "Lucas Sodré",
    healthCard: "700 9674 9916 0003",
    bloodType: "A+",
    birthDateString: "1999-01-25T00:50:00.241Z",
  },
];

export default async function Records() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <PageHeader
          title="Records"
          link={{
            href: "/records/create/personal-identification",
            text: "Create Record",
            icon: <PlusCircle className="h-3.5 w-3.5" />,
          }}
        />
        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {RECORDS.map(({ name, healthCard, bloodType, birthDateString }) => {
            const birthDate = new Date(birthDateString).getTime();
            const now = new Date().getTime();
            const age = new Date(now - birthDate).getFullYear() - 1970;

            return (
              <Card
                key={healthCard}
                className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
              >
                <CardHeader className="grid gap-4">
                  <CardTitle>{name}</CardTitle>
                  <div className="grid flex-1 auto-rows-min gap-0.5">
                    <div className="text-sm text-muted-foreground">
                      Health card
                    </div>
                    <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                      {healthCard}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex w-full items-center gap-2">
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                      <div className="text-xs text-muted-foreground">Blood</div>
                      <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                        {bloodType}
                      </div>
                    </div>
                    <Separator
                      orientation="vertical"
                      className="mx-2 h-10 w-px"
                    />
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                      <div className="text-xs text-muted-foreground">Age</div>
                      <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                        {age}
                        <span className="text-sm font-normal text-muted-foreground">
                          years
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row border-t p-4">
                  <Button className="w-full">View</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
