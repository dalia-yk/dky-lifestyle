import { Text } from "@react-email/components";
import { EmailLayout } from "./components/email-layout";
import { StatusBadge } from "./components/status-badge";

interface Props {
  clientName: string;
  bookingNumber: string;
  serviceName: string;
}

export function BookingCompletedEmail({
  clientName,
  bookingNumber,
  serviceName,
}: Props) {
  return (
    <EmailLayout previewText="Merci pour ta visite chez DKY Hair !">
      <StatusBadge status="COMPLETED" />
      <Text style={title}>Merci {clientName} !</Text>
      <Text style={subtitle}>
        Nous espérons que tu as adoré ton expérience{" "}
        <strong>{serviceName}</strong> (réservation {bookingNumber}). À très
        bientôt pour ta prochaine coiffure !
      </Text>
    </EmailLayout>
  );
}

const title = { color: "#F4EBDD", fontSize: "22px", margin: "0 0 8px" };
const subtitle = { color: "#F4EBDD99", fontSize: "14px", lineHeight: "1.6" };