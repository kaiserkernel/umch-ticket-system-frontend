import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export class HttpService {
  _axios = Axios.create({
    baseURL: API_URL
  });

  constructor() {
    // Add request interceptor to automatically include the token
    this._axios.interceptors.request.use(
      (config) => {
        let token = localStorage.getItem("token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this._axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response?.data?.message == "Token is not valid" ||
          error.response?.data?.message == "No token, authorization denied"
        ) {
          console.log(error.response?.data?.message);
          this.logout(); // Token expired or invalid
        }
        return Promise.reject(error);
      }
    );
  }

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    window.location.href = "/#/login"; // Redirect to login
  };

  addRequestInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.request.use(onFulfilled, onRejected);
  };

  addResponseInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.response.use(onFulfilled, onRejected);
  };

  get = async (url) => await this.request(this.getOptionsConfig("get", url));

  post = async (url, data) =>
    await this.request(this.getOptionsConfig("post", url, data));

  put = async (url, data) =>
    await this.request(this.getOptionsConfig("put", url, data));

  patch = async (url, data) =>
    await this.request(this.getOptionsConfig("patch", url, data));

  delete = async (url, data) =>
    await this.request(this.getOptionsConfig("delete", url, data));

  getOptionsConfig = (method, url, data) => {
    const headers = { "Content-Type": "application/json" };

    // If data is FormData, let Axios automatically set the correct headers
    if (data instanceof FormData) {
      delete headers["Content-Type"];
    }

    return {
      method,
      url,
      data,
      headers
    };
  };

  request(options) {
    return new Promise((resolve, reject) => {
      this._axios
        .request(options)
        .then((res) => resolve({ ...res.data, status: res.status }))
        .catch((ex) => reject(ex.response?.data || ex.message));
    });
  }
}

export default new HttpService();
