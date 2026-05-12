const axios = require("axios");

async function fetchRoute({ osrmBaseUrl, routeCoordinates }) {
  const osrmUrl = `${osrmBaseUrl}/route/v1/driving/${routeCoordinates}`;
  const { data } = await axios.get(osrmUrl, {
    params: {
      overview: "full",
      geometries: "geojson",
      steps: "false"
    }
  });

  return data;
}

module.exports = { fetchRoute };
