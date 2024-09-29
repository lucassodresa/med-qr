"use client";

import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface GetSidenavItemsParams {
  healthCard?: string;
  page: "create" | "edit" | "view";
}
const getSidenavItems = ({ page, healthCard }: GetSidenavItemsParams) => {
  const isCreate = page === "create";
  if (isCreate) return [];

  const items = [
    {
      href: `/records/${page}/${healthCard}/personal`,
      label: "Personal",
    },
    {
      href: `/records/${page}/${healthCard}/contact`,
      label: "Contact",
    },
    {
      href: `/records/${page}/${healthCard}/history`,
      label: "History",
    },
    {
      href: `/records/view/${healthCard}/qr-code`,
      label: "QR Code",
    },
  ];

  return items;
};

interface SidenavProps extends GetSidenavItemsParams {}

export default function Sidenav({ page, healthCard }: SidenavProps) {
  const pathname = usePathname();
  return (
    <nav className="grid gap-4 text-sm text-muted-foreground">
      {getSidenavItems({ page, healthCard }).map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn({ "font-semibold text-primary": isActive })}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
