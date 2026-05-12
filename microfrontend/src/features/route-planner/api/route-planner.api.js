import { bffClient } from "../../../shared/api/bff-client";

export function fetchAggregatedData({ origin, destination }) {
  return bffClient.get("/aggregated-data", {
    params: { origin, destination }
  });
}
