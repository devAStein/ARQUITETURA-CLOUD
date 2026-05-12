import { formatLatLng } from "../model/route.utils";

export function SelectedPoints({ origin, destination }) {
  return (
    <div className="card">
      <h2>Pontos selecionados</h2>
      <p>
        <strong>Origem:</strong> {origin ? formatLatLng(origin) : "-"}
      </p>
      <p>
        <strong>Destino:</strong> {destination ? formatLatLng(destination) : "-"}
      </p>
    </div>
  );
}
