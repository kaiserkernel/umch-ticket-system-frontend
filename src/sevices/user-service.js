import HttpService from "./http.service";

class UserService {
  createAdmin = async (payload) => {
    const createAdminEndpoint = "/api/admin/create-role";
    return await HttpService.post(createAdminEndpoint, payload);
  };
  getAdmins = async () => {
    const getAdminsEndpoint = "/api/admin/get-users";
    return await HttpService.get(getAdminsEndpoint);
  };
}

export default new UserService();
