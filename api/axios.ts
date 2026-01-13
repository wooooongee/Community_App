import axios from "axios";
import { Platform } from "react-native";

export const baseUrls = {
  // 실제 모바일에서 시뮬레이터 돌리려면 expo start 했을때 나오는 주소 사용 ex) http://172.30.1.84:8081
  // android: "http://10.0.2.2:3030",
  // ios: "http://localhost:3030",
  android: "http://172.30.1.7:3030",
  ios: "http://172.30.1.7:3030",
};

const axiosInstance = axios.create({
  baseURL: Platform.OS === "ios" ? baseUrls.ios : baseUrls.android,
});

export default axiosInstance;
