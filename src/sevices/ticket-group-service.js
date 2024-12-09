import HttpService from "./http.service";

class TicketGroupService {
    createTicketGroup = async (_payload) => {
        const createTicketGroupEndPoint = "/api/ticket-group";
        return await HttpService.post(createTicketGroupEndPoint, _payload);
    };
    addTicketTypeToTicketGroup = async (_payload) => {
        const addTicketTypeToTicketGroupEndPoint = "/api/ticket-group/add-type";
        return await HttpService.post(addTicketTypeToTicketGroupEndPoint, _payload);
    }
    fetchAllTicketGroups = async () => {
        const fetchAllTicketGroupsEndPoint = "api/ticket-group/all";
        return await HttpService.post(fetchAllTicketGroupsEndPoint);
    };
    updateTicketGroup = async (_payload) => {
        const updateTicketGroupEndPoint = "api/ticket-group/";
        return await HttpService.patch(updateTicketGroupEndPoint, _payload);
    };
    deleteTicketGroup = async (_payload) => {
        const deleteTicketGroupEndPoint = "api/ticket-group/";
        return await HttpService.delete(deleteTicketGroupEndPoint, _payload)
    };
    fetchAllRegistedTicketTypes = async () => {
        const fetchAllRegistedTicketTypesEndPoint = "/api/ticket-group/all-types";
        return await HttpService.post(fetchAllRegistedTicketTypesEndPoint);
    }
}

export default new TicketGroupService();