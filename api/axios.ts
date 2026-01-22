import axios, { InternalAxiosRequestConfig } from "axios";
import { Platform } from "react-native";

export const baseUrls = {
  // 실제 모바일에서 시뮬레이터 돌리려면 expo start 했을때 나오는 주소 사용 ex) http://172.30.1.84:8081
  // android: "http://10.0.2.2:3030",
  // ios: "http://localhost:3030",
  android: "http://172.30.1.42:3030",
  ios: "http://172.30.1.42:3030",
};

const axiosInstance = axios.create({
  baseURL: Platform.OS === "ios" ? baseUrls.ios : baseUrls.android,
});

const ENABLE_PERFORMANCE_LOG = __DEV__;

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (ENABLE_PERFORMANCE_LOG) {
    (config as any).metadata = { startTime: performance.now() };
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (ENABLE_PERFORMANCE_LOG && (response.config as any).metadata) {
      const duration =
        performance.now() - (response.config as any).metadata.startTime;
      const method = response.config.method?.toUpperCase();
      const url = response.config.url;
      console.log(`🌐 [API] ${method} ${url} - ${duration.toFixed(0)}ms`);
    }
    return response;
  },
  (error) => {
    if (ENABLE_PERFORMANCE_LOG && error.config?.metadata) {
      const duration = performance.now() - error.config.metadata.startTime;
      const method = error.config.method?.toUpperCase();
      const url = error.config.url;
      console.log(`❌ [API] ${method} ${url} - ${duration.toFixed(0)}ms (Error)`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
