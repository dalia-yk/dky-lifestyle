import { Text } from "@react-email/components";

const statusConfig = {
  PENDING: { label: "En attente", color: "#C8A45D", bg: "#C8A45D22" },
  CONFIRMED: { label: "Confirmée", color: "#4ADE80", bg: "#4ADE8022" },
  CANCELLED: { label: "Annulée", color: "#F4EBDD88", bg: "#F4EBDD11" },
  COMPLETED: { label: "Terminée", color: "#F4EBDD88", bg: "#F4EBDD11" },
};

export function StatusBadge({
  status,
}: {
  status: keyof typeof statusConfig;
}) {
  const config = statusConfig[status];
  return (
    <Text
      style={{
        display: "inline-block",
        color: config.color,
        backgroundColor: config.bg,
        fontSize: "11px",
        textTransform: "uppercase" as const,
        letterSpacing: "1px",
        padding: "6px 16px",
        borderRadius: "999px",
        margin: "0 0 16px",
      }}
    >
      ● {config.label}
    </Text>
  );
}