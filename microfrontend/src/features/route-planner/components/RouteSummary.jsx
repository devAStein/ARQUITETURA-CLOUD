export function RouteSummary({ routeSummary }) {
  if (!routeSummary) return null;

  return (
    <div className="card">
      <h2>Resumo da rota</h2>
      <p>
        <strong>Distancia:</strong> {routeSummary.distance}
      </p>
      <p>
        <strong>Tempo estimado:</strong> {routeSummary.duration}
      </p>
    </div>
  );
}
