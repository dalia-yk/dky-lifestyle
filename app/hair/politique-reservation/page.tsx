import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";

const sections = [
  {
    title: "1. Réservation et dépôt",
    items: [
      "Un dépôt de 20% est requis pour confirmer toute réservation.",
      "Le dépôt est déduit du montant total de la prestation.",
      "Aucune plage horaire n'est garantie tant que le dépôt n'a pas été reçu.",
    ],
  },
  {
    title: "2. Annulation et report",
    items: [
      "Les annulations ou reports effectués 48 heures ou plus avant le rendez-vous donnent droit à un remboursement complet du dépôt ou à son transfert vers une nouvelle réservation.",
      "Les annulations effectuées moins de 48 heures avant le rendez-vous entraînent la perte du dépôt.",
      "En cas d'absence (« no-show »), le dépôt est non remboursable.",
    ],
  },
  {
    title: "3. Retards",
    items: [
      "Un retard de plus de 15 minutes peut entraîner l'annulation ou le report du rendez-vous selon les disponibilités.",
      "Si le rendez-vous est annulé en raison d'un retard important, le dépôt ne sera pas remboursé.",
    ],
  },
  {
    title: "4. État des cheveux",
    items: [
      "Les cheveux doivent être propres et exempts d'accumulation excessive de produits, sauf si un service de lavage a été réservé.",
      "Les cheveux doivent être démêlés, sauf si un service de démêlage a été ajouté.",
      "Si les cheveux nécessitent un travail supplémentaire non indiqué lors de la réservation, des frais additionnels et un temps supplémentaire pourront être appliqués.",
      "Si l'état des cheveux ne permet pas de réaliser la prestation de façon sécuritaire ou dans le temps prévu, DKY Hair se réserve le droit de refuser ou de modifier le service.",
    ],
  },
  {
    title: "5. Enfants",
    items: [
      "Les services pour enfants sont destinés aux enfants capables de rester assis calmement pendant toute la durée de la prestation.",
      "Un parent ou un tuteur doit être présent pendant tout le rendez-vous.",
      "Si l'enfant est trop agité ou si la prestation ne peut être réalisée en toute sécurité, DKY Hair pourra interrompre le service. Selon la situation, le dépôt pourra être conservé.",
    ],
  },
  {
    title: "6. Santé du cuir chevelu",
    items: [
      "Pour des raisons d'hygiène et de sécurité, les services ne seront pas réalisés en présence de poux, infection du cuir chevelu, plaies ouvertes, ou toute autre affection contagieuse.",
      "Le rendez-vous devra être reporté une fois le problème traité.",
    ],
  },
  {
    title: "7. Photos de référence",
    items: [
      "Les photos servent uniquement de référence. Le résultat final peut varier selon la texture, la longueur, la densité, la couleur et l'état des cheveux.",
    ],
  },
  {
    title: "8. Paiement",
    items: [
      "Le solde restant est payable le jour du rendez-vous.",
      "Les modes de paiement acceptés seront indiqués lors du paiement.",
    ],
  },
  {
    title: "9. Modifications de la prestation",
    items: [
      "Si la cliente souhaite changer de coiffure ou ajouter des services le jour du rendez-vous, la demande sera acceptée uniquement si le temps le permet.",
      "Le prix et la durée seront ajustés en conséquence.",
    ],
  },
  {
    title: "10. Droit de refus",
    items: [
      "DKY Hair se réserve le droit de refuser ou d'interrompre une prestation en cas de comportement irrespectueux, de non-respect de cette politique ou si les conditions ne permettent pas d'offrir un service de qualité.",
    ],
  },
];

export default function BookingPolicyPage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Politique de réservation"
        description="À lire avant toute réservation — pour une expérience claire et respectueuse pour tous."
      />

      <section className="bg-brand-ivory py-16 px-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-heading text-brand-black text-xl mb-4">
                {section.title}
              </h2>
              <ul className="flex flex-col gap-2">
                {section.items.map((item, i) => (
                  <li key={i} className="font-sans text-brand-mocha/80 text-sm leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}