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

  acceptEnrollmentInquiry = async (payload) => {
    const acceptEnrollmentEndPoint = `/api/admin/inquiries/enrollment/accept`;
    return await HttpService.post(acceptEnrollmentEndPoint, payload);
  };

  previewCredentailPDF = async (payload) => {
    const previewCredentailPDFEndPoint = `/api/admin/inquiries/enrollment/previewCredentialPDF`;
    return await HttpService.post(previewCredentailPDFEndPoint, payload);
  };

  acceptTransferTarguMuresInquiry = async (payload) => {
    const acceptEnrollmentEndPoint = `/api/admin/inquiries/transferTarguMures/accept`;
    return await HttpService.post(acceptEnrollmentEndPoint, payload);
  };

  acceptExamInspectionInquiry = async (payload) => {
    const acceptExamInspectionEndPoint = `/api/admin/inquiries/examInspection/accept`;
    return await HttpService.post(acceptExamInspectionEndPoint, payload);
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

  processTranscriptRecord = async (id) => {
    const processTranscriptRecordEndpoint = `/api/admin/inquiries/processTranscriptRecord/${id}`;
    return await HttpService.get(processTranscriptRecordEndpoint);
  };
  doneTranscriptRecord = async (id) => {
    const doneTranscriptRecordEndpoint = `/api/admin/inquiries/doneTranscriptRecord/${id}`;
    return await HttpService.get(doneTranscriptRecordEndpoint);
  };
  notifyTranscriptRecord = async (payload) => {
    const notifyTranscriptRecordEndpoint =
      "/api/admin/inquiries/notifyTranscriptRecord";
    return await HttpService.post(notifyTranscriptRecordEndpoint, payload);
  };
  getAdminUsers = async () => {
    const getAdminUsersEndPoint = "/api/admin/get-users";
    return await HttpService.get(getAdminUsersEndPoint);
  };
  sendPassEmail = async (payload) => {
    const sendPassEmailEndpoint = "/api/admin/send-pass-email";
    return await HttpService.post(sendPassEmailEndpoint, payload);
  };
  closeInquiry = async (payload) => {
    const closeInquiryEndPoint = `/api/admin/inquiries/close`;
    return await HttpService.post(closeInquiryEndPoint, payload);
  };
  sendInternalNote = async (payload) => {
    const sendInternalNoteEndPoint = "/api/admin/internal-note";
    return await HttpService.post(sendInternalNoteEndPoint, payload);
  };
  replyStudent = async (payload) => {
    const replyStudentEndPoint = "/api/admin/reply-student";
    return await HttpService.post(replyStudentEndPoint, payload);
  };
  fetchInternalNote = async () => {
    const fetchInternalNoteEndPoint = "/api/admin/internal-note";
    return await HttpService.get(fetchInternalNoteEndPoint);
  };
  fetchReplyStudentMessageList = async () => {
    const fethcReplyStudentMessageListEndPoint = "/api/admin/reply-student/all";
    return await HttpService.get(fethcReplyStudentMessageListEndPoint);
  };
  fetchReplyStudentMessage = async () => {
    const fethcReplyStudentMessageEndPoint = "/api/admin/reply-student";
    return await HttpService.get(fethcReplyStudentMessageEndPoint);
  };
}

export default new FormSevice();
