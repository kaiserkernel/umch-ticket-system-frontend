import HttpService from "./http.service";

class AuthService {
  login = async (payload) => {
    const loginEndpoint = "/api/auth/login";
    return await HttpService.post(loginEndpoint, payload);
  };

  register = async (credentials) => {
    const registerEndpoint = "/api/auth/register";
    return await HttpService.post(registerEndpoint, credentials);
  };

  logout = async (payload) => {
    const logoutEndpoint = "logout";
    return await HttpService.post(logoutEndpoint, payload);
  };

  forgotPassword = async (payload) => {
    const forgotPassword = "password-forgot";
    return await HttpService.post(forgotPassword, payload);
  };

  resetPassword = async (credentials) => {
    const resetPassword = "password-reset";
    return await HttpService.post(resetPassword, credentials);
  };
}

export default new AuthService();
