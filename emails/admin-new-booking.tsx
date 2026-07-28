import { Button, Column, Row, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/email-layout";

interface AdminNewBookingEmailProps {
  bookingNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  dateLabel: string;
  time: string;
  locationLabel: string;
  totalPrice: number;
  depositAmount: number;
}

export function AdminNewBookingEmail({
  bookingNumber,
  clientName,
  clientEmail,
  clientPhone,
  serviceName,
  dateLabel,
  time,
  locationLabel,
  totalPrice,
  depositAmount,
}: AdminNewBookingEmailProps) {
  return (
    <EmailLayout previewText={`Nouvelle réservation ${bookingNumber}`}>
      <Text style={badge}>Nouvelle réservation</Text>
      <Text style={title}>{bookingNumber}</Text>

      <Section style={card}>
        <Text style={cardTitle}>{serviceName}</Text>
        <Text style={cardLine}>📅 {dateLabel}</Text>
        <Text style={cardLine}>🕐 {time}</Text>
        <Text style={cardLine}>📍 {locationLabel}</Text>
      </Section>

      <Section style={card}>
        <Text style={sectionLabel}>Cliente</Text>
        <Text style={cardLine}>{clientName}</Text>
        <Text style={cardLine}>{clientEmail}</Text>
        <Text style={cardLine}>{clientPhone}</Text>
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
            <Text style={{ ...cardLine, color: "#C8A45D" }}>Dépôt à percevoir</Text>
          </Column>
          <Column align="right">
            <Text style={{ ...cardLine, color: "#C8A45D" }}>{depositAmount}$</Text>
          </Column>
        </Row>
      </Section>

      <Section style={{ textAlign: "center" as const, marginTop: "24px" }}>
        <Button style={button} href="http://localhost:3000/admin/hair/bookings">
          Voir dans le dashboard
        </Button>
      </Section>
    </EmailLayout>
  );
}

const badge = {
  color: "#C8A45D",
  fontSize: "11px",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "0 0 4px",
};

const title = {
  color: "#F4EBDD",
  fontSize: "22px",
  margin: "0 0 24px",
};

const card = {
  backgroundColor: "#FFFFFF0A",
  border: "1px solid #C8A45D33",
  borderRadius: "16px",
  padding: "20px",
  marginBottom: "16px",
};

const sectionLabel = {
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