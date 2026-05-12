import { useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import { fetchAggregatedData } from "../api/route-planner.api";
import { AggregatedDataSummary } from "../components/AggregatedDataSummary";
import { RouteMap } from "../components/RouteMap";
import { RouteSummary } from "../components/RouteSummary";
import { SelectedPoints } from "../components/SelectedPoints";
import { extractRoutePath, extractRouteSummary, formatLatLng } from "../model/route.utils";

export function RoutePlannerPage() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [nextPoint, setNextPoint] = useState("origin");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const routeSummary = useMemo(() => extractRouteSummary(data?.route), [data]);
  const routePath = useMemo(() => extractRoutePath(data?.route), [data]);

  function handleMapPick(point) {
    if (nextPoint === "origin") {
      setOrigin(point);
      setNextPoint("destination");
      return;
    }

    setDestination(point);
    setNextPoint("origin");
  }

  function resetSelection() {
    setOrigin(null);
    setDestination(null);
    setData(null);
    setError("");
    setNextPoint("origin");
  }

  async function loadAggregatedData() {
    if (!origin || !destination) {
      setError("Selecione origem e destino clicando no mapa.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetchAggregatedData({
        origin: formatLatLng(origin),
        destination: formatLatLng(destination)
      });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.reason || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="content">
      <div className="map-panel">
        <div className="map-hint">
          Proximo clique define: <strong>{nextPoint === "origin" ? "Origem" : "Destino"}</strong>
        </div>
        <RouteMap
          origin={origin}
          destination={destination}
          routePath={routePath}
          onPick={handleMapPick}
        />
      </div>

      <div className="side-panel">
        <SelectedPoints origin={origin} destination={destination} />

        <div className="actions">
          <button onClick={loadAggregatedData} disabled={loading}>
            {loading ? "Calculando..." : "Calcular melhor rota"}
          </button>
          <button className="secondary" onClick={resetSelection} disabled={loading}>
            Limpar seleÃ§Ã£o
          </button>
        </div>

        {error && <p className="error">Erro: {error}</p>}

        <RouteSummary routeSummary={routeSummary} />
        <AggregatedDataSummary data={data} />
      </div>
    </section>
  );
}
