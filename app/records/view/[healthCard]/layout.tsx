import { PageHeader } from "@/components/page-header";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RecordsViewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { healthCard: string };
}) {
  console.log({ params });
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <PageHeader
        title="View Record"
        link={{
          href: "/records",
          text: "Back",
          icon: <ArrowLeft className="h-3.5 w-3.5" />,
        }}
        button={{ variant: "outline" }}
      />
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground">
          <Link href={`/records/view/${params.healthCard}/personal`}>
            Personal
          </Link>
          <Link href={`/records/view/${params.healthCard}/contact`}>
            Contact
          </Link>
          <Link href={`/records/view/${params.healthCard}/history`}>
            History
          </Link>
          <Link href={`/records/view/${params.healthCard}/qr-code`}>
            QR Code
          </Link>
        </nav>
        {children}
      </div>
    </main>
  );
}
