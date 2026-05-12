import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import { RouteBounds } from "../../../shared/map/RouteBounds";
import { SelectionLayer } from "../../../shared/map/SelectionLayer";
import { defaultIcon } from "../../../shared/map/leaflet-icon";
import { MAP_CENTER } from "../model/route.utils";

export function RouteMap({ origin, destination, routePath, onPick }) {
  return (
    <MapContainer center={MAP_CENTER} zoom={13} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SelectionLayer onPick={onPick} />
      {origin && <Marker position={origin} icon={defaultIcon} />}
      {destination && <Marker position={destination} icon={defaultIcon} />}
      {routePath.length > 1 && (
        <>
          <RouteBounds points={routePath} />
          <Polyline positions={routePath} pathOptions={{ color: "#2563eb", weight: 5 }} />
        </>
      )}
      {routePath.length === 0 && origin && destination && (
        <Polyline
          positions={[origin, destination]}
          pathOptions={{ color: "#94a3b8", dashArray: "8 8", weight: 3 }}
        />
      )}
    </MapContainer>
  );
}
