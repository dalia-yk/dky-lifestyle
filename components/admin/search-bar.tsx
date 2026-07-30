"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar({ placeholder = "Rechercher..." }: { placeholder?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      params.delete("page");
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    }, 400);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative w-full max-w-xs">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-ivory/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-brand-champagne/20 focus:border-brand-champagne rounded-lg pl-9 pr-4 py-2 text-brand-ivory text-sm outline-none transition-colors"
      />
      {isPending && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-champagne text-xs">...</span>
      )}
    </div>
  );
}