import { Button, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/email-layout";
import { StatusBadge } from "./components/status-badge";

interface Props {
  clientName: string;
  bookingNumber: string;
  serviceName: string;
  dateLabel: string;
  time: string;
}

export function BookingConfirmedEmail({
  clientName,
  bookingNumber,
  serviceName,
  dateLabel,
  time,
}: Props) {
  return (
    <EmailLayout previewText={`Réservation ${bookingNumber} confirmée !`}>
      <StatusBadge status="CONFIRMED" />
      <Text style={title}>C&apos;est confirmé, {clientName} !</Text>
      <Text style={subtitle}>
        Ta réservation {bookingNumber} pour <strong>{serviceName}</strong> le{" "}
        {dateLabel} à {time} est officiellement confirmée.
      </Text>
      <Section style={{ textAlign: "center" as const, marginTop: "24px" }}>
        <Button style={button} href="http://localhost:3000/hair/compte">
          Voir ma réservation
        </Button>
      </Section>
    </EmailLayout>
  );
}

const title = { color: "#F4EBDD", fontSize: "22px", margin: "0 0 8px" };
const subtitle = { color: "#F4EBDD99", fontSize: "14px", lineHeight: "1.6" };
const button = {
  backgroundColor: "#C8A45D",
  color: "#0B0B0B",
  fontSize: "14px",
  padding: "12px 32px",
  borderRadius: "999px",
  textDecoration: "none",
};