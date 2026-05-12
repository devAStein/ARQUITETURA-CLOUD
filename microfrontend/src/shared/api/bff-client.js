import axios from "axios";
import { env } from "../../config/env";

export const bffClient = axios.create({
  baseURL: env.bffBaseUrl
});
