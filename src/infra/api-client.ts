import axios from "axios";
import { envConfig } from "./env-config";

export const apiClient = axios.create({
  baseURL: envConfig.trendingApi,
});
