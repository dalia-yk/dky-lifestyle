import { Text } from "@react-email/components";
import { EmailLayout } from "./components/email-layout";
import { StatusBadge } from "./components/status-badge";

interface Props {
  clientName: string;
  bookingNumber: string;
  serviceName: string;
  dateLabel: string;
  time: string;
}

export function BookingCancelledEmail({
  clientName,
  bookingNumber,
  serviceName,
  dateLabel,
  time,
}: Props) {
  return (
    <EmailLayout previewText={`Réservation ${bookingNumber} annulée`}>
      <StatusBadge status="CANCELLED" />
      <Text style={title}>Bonjour {clientName},</Text>
      <Text style={subtitle}>
        Ta réservation {bookingNumber} pour <strong>{serviceName}</strong> le{" "}
        {dateLabel} à {time} a été annulée. N&apos;hésite pas à réserver un
        nouveau créneau quand tu le souhaites.
      </Text>
    </EmailLayout>
  );
}

const title = { color: "#F4EBDD", fontSize: "22px", margin: "0 0 8px" };
const subtitle = { color: "#F4EBDD99", fontSize: "14px", lineHeight: "1.6" };