import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export function EmailLayout({
  previewText,
  children,
}: {
  previewText: string;
  children: React.ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brandName}>DKY Hair</Text>
            <Text style={brandSubtitle}>by DKY Lifestyle</Text>
          </Section>

          {children}

          <Hr style={hr} />
          <Section>
            <Text style={policyText}>
              Merci d&apos;arriver avec les cheveux démêlés. En cas de retard
              de plus de 15 minutes, ta réservation pourrait être annulée sans
              remboursement du dépôt.
            </Text>
            <Text style={footerText}>
              DKY Hair — Crafted by Purpose
              <br />
              Une division de DKY Lifestyle
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#0B0B0B",
  fontFamily: "Georgia, serif",
};

const container = {
  margin: "0 auto",
  padding: "40px 24px",
  maxWidth: "560px",
};

const header = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const brandName = {
  color: "#F4EBDD",
  fontSize: "24px",
  margin: "0",
};

const brandSubtitle = {
  color: "#C8A45D",
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "2px",
  margin: "4px 0 0",
};

const hr = {
  borderColor: "#C8A45D33",
  margin: "32px 0",
};

const policyText = {
  color: "#F4EBDD99",
  fontSize: "12px",
  lineHeight: "1.6",
};

const footerText = {
  color: "#F4EBDD66",
  fontSize: "11px",
  textAlign: "center" as const,
  marginTop: "16px",
};