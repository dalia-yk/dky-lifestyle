import { Text } from "@react-email/components";
import { EmailLayout } from "./components/email-layout";
import { StatusBadge } from "./components/status-badge";

interface Props {
  clientName: string;
  bookingNumber: string;
  serviceName: string;
  dateLabel: string;
  time: string;
  refundAmount: number;
  refundReason: string;
  cancellationReason?: string;
}

export function BookingCancelledEmail({
  clientName,
  bookingNumber,
  serviceName,
  dateLabel,
  time,
  refundAmount,
  refundReason,
  cancellationReason,
}: Props) {
  return (
    <EmailLayout previewText={`Réservation ${bookingNumber} annulée`}>
      <StatusBadge status="CANCELLED" />
      <Text style={title}>Bonjour {clientName},</Text>
      <Text style={subtitle}>
        Ta réservation {bookingNumber} pour <strong>{serviceName}</strong> le{" "}
        {dateLabel} à {time} a été annulée.
      </Text>
      {cancellationReason && (
        <Text style={subtitle}>Raison : {cancellationReason}</Text>
      )}
      <Text style={refundLine}>
        {refundAmount > 0
          ? `Un remboursement de ${refundAmount}$ a été initié (${refundReason}).`
          : `Aucun remboursement applicable (${refundReason || "voir notre politique d'annulation"}).`}
      </Text>
    </EmailLayout>
  );
}

const title = { color: "#F4EBDD", fontSize: "22px", margin: "0 0 8px" };
const subtitle = { color: "#F4EBDD99", fontSize: "14px", lineHeight: "1.6" };
const refundLine = { color: "#C8A45D", fontSize: "14px", marginTop: "16px" };