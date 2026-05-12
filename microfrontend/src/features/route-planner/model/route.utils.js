export const MAP_CENTER = [-25.4294, -49.2719];

export function formatLatLng(latlng) {
  return `${latlng[0].toFixed(6)},${latlng[1].toFixed(6)}`;
}

export function extractRouteSummary(routeData) {
  if (!routeData?.raw) return null;

  if (routeData.provider === "google-maps") {
    const element = routeData.raw?.rows?.[0]?.elements?.[0];
    if (!element) return null;
    return {
      distance: element.distance?.text || "-",
      duration: element.duration?.text || "-"
    };
  }

  if (routeData.provider === "openstreetmap-osrm") {
    const firstRoute = routeData.raw?.routes?.[0];
    if (!firstRoute) return null;
    const distanceKm = (firstRoute.distance / 1000).toFixed(2);
    const durationMinutes = Math.ceil(firstRoute.duration / 60);
    return {
      distance: `${distanceKm} km`,
      duration: `${durationMinutes} min`
    };
  }

  return null;
}

export function extractRoutePath(routeData) {
  if (Array.isArray(routeData?.path) && routeData.path.length > 0) {
    return routeData.path;
  }

  return [];
}
