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
  acceptInquiry = async (payload) => {
    const getInquiriesEndPoint = `/api/admin/inquiries/accept`;
    return await HttpService.post(getInquiriesEndPoint, payload);
  };
  rejectInquiry = async (payload) => {
    const getInquiriesEndPoint = `/api/admin/inquiries/reject`;
    return await HttpService.post(getInquiriesEndPoint, payload);
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
  reOpenTicket = async (payload) => {
    const reOpenTicketEndPoint = "/api/admin/inquiries/reOpenTicket";
    return await HttpService.post(reOpenTicketEndPoint, payload);
  };
}

export default new FormSevice();
