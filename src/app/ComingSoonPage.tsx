interface ComingSoonPageProps {
  title: string;
}

export function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold text-text">{title}</h1>
      <p className="text-sm text-text-muted">Esta área ainda está em desenvolvimento.</p>
    </div>
  );
}
