import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});


// REQUEST INTERCEPTOR
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  // Do NOT attach token to auth endpoints
  if (
    token &&
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/register") &&
    !config.url.includes("/auth/token/refresh")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});


// RESPONSE INTERCEPTOR
API.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    // Ignore if no response
    if (!error.response) {
      return Promise.reject(error);
    }

    // Do NOT refresh for login/register/refresh endpoints
    if (
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/register") ||
      originalRequest.url.includes("/auth/token/refresh")
    ) {
      return Promise.reject(error);
    }

    // If token expired
    if (error.response.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (!refresh) {
        window.location.href = "/";
        return Promise.reject(error);
      }

      try {

        const res = await axios.post(
          "http://127.0.0.1:8000/api/auth/token/refresh/",
          { refresh }
        );

        const newAccess = res.data.access;

        localStorage.setItem("token", newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return API(originalRequest);

      } catch (err) {

        localStorage.removeItem("token");
        localStorage.removeItem("refresh");

        window.location.href = "/";

        return Promise.reject(err);

      }

    }

    return Promise.reject(error);

  }

);

export default API;