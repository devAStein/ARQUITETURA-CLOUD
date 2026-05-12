import { useMapEvents } from "react-leaflet";

export function SelectionLayer({ onPick }) {
  useMapEvents({
    click(event) {
      onPick([event.latlng.lat, event.latlng.lng]);
    }
  });

  return null;
}
