import { PageHeader } from "@/src/components/page-header";
import Sidenav from "@/src/components/sidenav";

export default function RecordsViewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { healthCard: string };
}) {
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <PageHeader page="edit" />
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <Sidenav page="edit" healthCard={params.healthCard} />
        {children}
      </div>
    </main>
  );
}
