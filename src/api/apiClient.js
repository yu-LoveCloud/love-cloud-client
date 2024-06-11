import axios from "axios";
import { BASE_URL } from "../constants/global";
import { getCookie, setCookie, removeCookie } from "../Cookie";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가. 액세스토큰을 요청 헤더에 추가함
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 및 만료된 액세스 토큰일 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getCookie("refresh_token");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(
          `${BASE_URL}/auth/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        setCookie("access_token", newAccessToken, { path: "/" });
        setCookie("refresh_token", newRefreshToken, { path: "/" });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (tokenRefreshError) {
        console.error("Failed to refresh token", tokenRefreshError);
        removeCookie("access_token");
        removeCookie("refresh_token");

        return Promise.reject(tokenRefreshError);
      }
    }

    return Promise.reject(error);
  }
);
