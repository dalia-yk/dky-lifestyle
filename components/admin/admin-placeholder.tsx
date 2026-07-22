export function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="font-heading text-brand-ivory text-3xl mb-4">{title}</h1>
      <p className="font-sans text-brand-ivory/50 text-sm">
        Cette section sera bientôt disponible.
      </p>
    </div>
  );
}