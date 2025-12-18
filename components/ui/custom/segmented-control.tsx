"use client";

export function SegmentedControl({
  value,
  onValueChange,
  options,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="inline-flex rounded-lg border bg-muted p-1">
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          onClick={() => onValueChange(option.value)}
          className={`px-3 py-1 rounded-lg transition-colors ${
            value === option.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted/50"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
