import { Button, Column, Row, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/email-layout";
import { StatusBadge } from "./components/status-badge";

interface BookingCreatedEmailProps {
  clientName: string;
  bookingNumber: string;
  serviceName: string;
  dateLabel: string;
  time: string;
  locationLabel: string;
  totalPrice: number;
  depositAmount: number;
  remainingBalance: number;
}

export function BookingCreatedEmail({
  clientName,
  bookingNumber,
  serviceName,
  dateLabel,
  time,
  locationLabel,
  totalPrice,
  depositAmount,
  remainingBalance,
}: BookingCreatedEmailProps) {
  return (
    <EmailLayout previewText={`Ta réservation ${bookingNumber} est enregistrée`}>
      <StatusBadge status="PENDING" />

      <Text style={title}>Merci {clientName} !</Text>
      <Text style={subtitle}>
        Ta demande de réservation a bien été enregistrée.
      </Text>

      <Section style={card}>
        <Text style={bookingRef}>Réservation {bookingNumber}</Text>
        <Text style={cardTitle}>{serviceName}</Text>
        <Text style={cardLine}>📅 {dateLabel}</Text>
        <Text style={cardLine}>🕐 {time}</Text>
        <Text style={cardLine}>📍 {locationLabel}</Text>
      </Section>

      <Section style={card}>
        <Row>
          <Column>
            <Text style={cardLine}>Prix total</Text>
          </Column>
          <Column align="right">
            <Text style={cardLine}>{totalPrice}$</Text>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text style={{ ...cardLine, color: "#C8A45D" }}>
              Dépôt requis
            </Text>
          </Column>
          <Column align="right">
            <Text style={{ ...cardLine, color: "#C8A45D" }}>
              {depositAmount}$
            </Text>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text style={cardLine}>Solde restant</Text>
          </Column>
          <Column align="right">
            <Text style={cardLine}>{remainingBalance}$</Text>
          </Column>
        </Row>
      </Section>

      <Section style={{ textAlign: "center" as const, marginTop: "24px" }}>
        <Button style={button} href="http://localhost:3000/hair/compte">
          Voir ma réservation
        </Button>
      </Section>
    </EmailLayout>
  );
}

const title = {
  color: "#F4EBDD",
  fontSize: "22px",
  margin: "0 0 8px",
};

const subtitle = {
  color: "#F4EBDD99",
  fontSize: "14px",
  margin: "0 0 24px",
};

const card = {
  backgroundColor: "#FFFFFF0A",
  border: "1px solid #C8A45D33",
  borderRadius: "16px",
  padding: "20px",
  marginBottom: "16px",
};

const bookingRef = {
  color: "#C8A45D",
  fontSize: "11px",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "0 0 8px",
};

const cardTitle = {
  color: "#F4EBDD",
  fontSize: "18px",
  margin: "0 0 8px",
};

const cardLine = {
  color: "#F4EBDD",
  fontSize: "13px",
  margin: "4px 0",
};

const button = {
  backgroundColor: "#C8A45D",
  color: "#0B0B0B",
  fontSize: "14px",
  padding: "12px 32px",
  borderRadius: "999px",
  textDecoration: "none",
};