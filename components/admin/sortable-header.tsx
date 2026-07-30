import Link from "next/link";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

interface SortableHeaderProps {
  label: string;
  field: string;
  currentSort?: string;
  currentOrder?: string;
  basePath: string;
  searchParams: Record<string, string | undefined>;
}

export function SortableHeader({
  label,
  field,
  currentSort,
  currentOrder,
  basePath,
  searchParams,
}: SortableHeaderProps) {
  const isActive = currentSort === field;
  const nextOrder = isActive && currentOrder === "asc" ? "desc" : "asc";

  const params = new URLSearchParams(
    Object.entries(searchParams).filter(([, v]) => v !== undefined) as [string, string][]
  );
  params.set("sort", field);
  params.set("order", nextOrder);

  return (
    <Link
      href={`${basePath}?${params.toString()}`}
      className="inline-flex items-center gap-1 font-sans text-brand-ivory/50 text-xs uppercase tracking-widest hover:text-brand-champagne transition-colors"
    >
      {label}
      {isActive ? (
        currentOrder === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />
      ) : (
        <ArrowUpDown size={12} className="opacity-30" />
      )}
    </Link>
  );
}