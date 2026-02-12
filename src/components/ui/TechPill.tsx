import { cn } from "@/lib/utils";

interface TechPillProps {
  label: string;
  className?: string;
}

export function TechPill({ label, className }: TechPillProps) {
  return (
    <span
      className={cn(
        "px-3 py-1 text-[10px] md:text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/30 tracking-wider inline-flex items-center justify-center uppercase",
        className
      )}
    >
      {label}
    </span>
  );
}
