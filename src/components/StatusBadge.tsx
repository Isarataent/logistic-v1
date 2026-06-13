export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "in-transit": "bg-amber-50 text-amber-700 border-amber-200",
    available: "bg-emerald-50 text-emerald-700 border-emerald-200",
    maintenance: "bg-sky-50 text-sky-700 border-sky-200",
    offline: "bg-rose-50 text-rose-700 border-rose-200",
  };
  const labels: Record<string, string> = {
    "in-transit": "กำลังวิ่ง",
    available: "ว่าง",
    maintenance: "ซ่อมบำรุง",
    offline: "ออฟไลน์",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.offline}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "in-transit" ? "bg-amber-500 animate-pulse" : status === "available" ? "bg-emerald-500" : status === "maintenance" ? "bg-sky-500" : "bg-rose-500"}`} />
      {labels[status] || status}
    </span>
  );
}
