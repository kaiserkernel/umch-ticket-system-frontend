import HttpService from "./http.service";

class AuthService {
  adminLogin = async (payload) => {
    const loginEndpoint = "/api/auth/admin";
    return await HttpService.post(loginEndpoint, payload);
  };
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

  deleteUser = async (payload) => {
    const deleteUser = `/api/admin/delete-user/${payload}`;
    return await HttpService.delete(deleteUser);
  }

  resetPasswordToDefault = async (payload) => {
    const resetPassword = `/api/admin/reset-password/${payload}`;
    return await HttpService.get(resetPassword);
  }

  updateProfile = async (payload) => {
    const updateProfileEndpoint = "/api/user/update-profile";
    return await HttpService.post(updateProfileEndpoint, payload);
  };
}

export default new AuthService();
