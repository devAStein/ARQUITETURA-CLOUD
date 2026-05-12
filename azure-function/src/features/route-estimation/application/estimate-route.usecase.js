const { parseCoordinates, toLatLngPath, toOsrmCoordinate } = require("../domain/coordinates");

async function estimateRoute({ origin, destination, osrmBaseUrl, osrmClient }) {
  const originCoordinates = parseCoordinates(origin);
  const destinationCoordinates = parseCoordinates(destination);
  const routeCoordinates = `${toOsrmCoordinate(originCoordinates)};${toOsrmCoordinate(destinationCoordinates)}`;
  const data = await osrmClient.fetchRoute({ osrmBaseUrl, routeCoordinates });
  const firstRoute = data.routes?.[0];

  return {
    provider: "openstreetmap-osrm",
    origin,
    destination,
    distanceMeters: firstRoute?.distance || null,
    durationSeconds: firstRoute?.duration || null,
    path: toLatLngPath(firstRoute?.geometry?.coordinates || []),
    raw: data
  };
}

module.exports = { estimateRoute };
