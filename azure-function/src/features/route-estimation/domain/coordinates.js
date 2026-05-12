function parseCoordinates(value) {
  const [lat, lng] = value.split(",");
  return { lat, lng };
}

function toOsrmCoordinate(coordinates) {
  return `${coordinates.lng},${coordinates.lat}`;
}

function toLatLngPath(coordinates) {
  return coordinates.map(([lng, lat]) => [lat, lng]);
}

module.exports = {
  parseCoordinates,
  toOsrmCoordinate,
  toLatLngPath
};
