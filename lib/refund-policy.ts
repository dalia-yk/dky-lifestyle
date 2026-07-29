export type RefundDecision = {
  refundPercent: number;
  reason: string;
};

export function calculateRefund(
  appointmentDate: Date,
  appointmentTime: string,
  cancelledByAdmin: boolean
): RefundDecision {
  if (cancelledByAdmin) {
    return { refundPercent: 100, reason: "Annulation par DKY Hair" };
  }

  const [hours, minutes] = appointmentTime.split(":").map(Number);
  const appointmentDateTime = new Date(appointmentDate);
  appointmentDateTime.setHours(hours, minutes, 0, 0);

  const now = new Date();
  const hoursUntilAppointment =
    (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntilAppointment >= 48) {
    return { refundPercent: 100, reason: "Annulation plus de 48h à l'avance" };
  }

  if (hoursUntilAppointment >= 24) {
    return { refundPercent: 50, reason: "Annulation entre 24h et 48h à l'avance" };
  }

  return { refundPercent: 0, reason: "Annulation moins de 24h à l'avance" };
}