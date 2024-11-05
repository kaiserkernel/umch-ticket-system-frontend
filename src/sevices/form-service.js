import HttpService from "./http.service";

class FormSevice {
  createInquiry = async (payload) => {
    const createInquiryEndpoint = "/api/user/submit-inquiry";
    return await HttpService.post(createInquiryEndpoint, payload);
  };
  getAllInquiries = async (payload) => {
    const getInquiriesEndPoint = "/api/admin/inquiries";
    return await HttpService.get(getInquiriesEndPoint, payload);
  };
  acceptInquiry = async (id) => {
    const getInquiriesEndPoint = `/api/admin/inquiries/${id}/accept`;
    return await HttpService.patch(getInquiriesEndPoint);
  };
  rejectInquiry = async (id) => {
    const getInquiriesEndPoint = `/api/admin/inquiries/${id}/reject`;
    return await HttpService.patch(getInquiriesEndPoint);
  };
  checkInquiry = async (id) => {
    const checkInquiryByIdEndPoint = `/api/admin/inquiries/${id}/check`;
    return await HttpService.patch(checkInquiryByIdEndPoint);
  };
  getAllInquiriesByEnrollmentNumber = async (id) => {
    const getInquiriesByEnrollmentNumberEndPoint = `/api/admin/inquiries/${id}`;
    return await HttpService.get(getInquiriesByEnrollmentNumberEndPoint);
  };
  getInquiryByInquiryId = async (id) => {
    const getInquiryByIdEndPoint = `/api/admin/inquiries/${id}/show`;
    return await HttpService.get(getInquiryByIdEndPoint);
  };
}

export default new FormSevice();
