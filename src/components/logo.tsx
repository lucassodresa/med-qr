import { cn } from "@/src/lib/utils";
import { HeartPulse } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/records"
      className={cn(
        "flex items-center gap-2 text-lg font-semibold md:text-base"
      )}
    >
      <HeartPulse className="h-6 w-6" />
      <span>MedQR</span>
    </Link>
  );
};
