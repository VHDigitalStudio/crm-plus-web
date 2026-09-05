const relativeTimeFormatter = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

export function formatRelativeDate(iso: string): string {
  const diffMs = new Date(iso).getTime() - Date.now();
  const diffMinutes = Math.round(diffMs / 60_000);
  const diffHours = Math.round(diffMs / 3_600_000);
  const diffDays = Math.round(diffMs / 86_400_000);

  if (Math.abs(diffMinutes) < 60) return relativeTimeFormatter.format(diffMinutes, "minute");
  if (Math.abs(diffHours) < 24) return relativeTimeFormatter.format(diffHours, "hour");
  return relativeTimeFormatter.format(diffDays, "day");
}
