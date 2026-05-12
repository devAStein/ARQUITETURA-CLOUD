import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function RouteBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    if (points.length > 1) {
      map.fitBounds(points, { padding: [28, 28] });
    }
  }, [map, points]);

  return null;
}
