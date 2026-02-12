import { cn } from "@/lib/utils";

interface TechPillProps {
  label: string;
  className?: string;
}

export function TechPill({ label, className }: TechPillProps) {
  return (
    <span
      className={cn(
        "px-3 py-1 text-[10px] font-bold rounded-full bg-primary/10 text-primary border border-primary/30 tracking-widest uppercase inline-flex items-center justify-center",
        className
      )}
    >
      {label}
    </span>
  );
}
