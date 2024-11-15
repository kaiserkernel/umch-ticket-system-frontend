import HttpService from "./http.service";

class EmailTemplateService {
  addEmailTemplate = async (payload) => {
    const addEmailTemplateEndpoint = "/api/emailTemplate/add";
    return await HttpService.post(addEmailTemplateEndpoint, payload);
  };
  getEmailTemplate = async (id) => {
    const getEmailTemplateEndpoint = `/api/emailTemplate/get/${id}`;
    return await HttpService.get(getEmailTemplateEndpoint);
  };
  getEmailTemplates = async () => {
    const getEmailTemplateEndpoint = "/api/emailTemplate/get";
    return await HttpService.get(getEmailTemplateEndpoint);
  };
  getEmailTemplatesByCategory = async (payload) => {
    const getEmailTemplatesByCategoryEndpoint =
      "/api/emailTemplate/get-templates-by-category";
    return await HttpService.post(getEmailTemplatesByCategoryEndpoint, payload);
  };
  editEmailTemplate = async (payload) => {
    const editEmailTemplateEndpoint = "/api/emailTemplate/edit";
    return await HttpService.patch(editEmailTemplateEndpoint, payload);
  };

  deleteEmailTemplate = async (id) => {
    const deleteEmailTemplateEndpoint = `/api/emailTemplate/delete/${id}`;
    return await HttpService.get(deleteEmailTemplateEndpoint);
  };
}

export default new EmailTemplateService();
