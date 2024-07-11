/* Appointment */
    // Requests
export type GetAppoinmentsRequest = {
    maxRecords?: number,
    view?: string,
    pageSize?: number,
    sort?: string
}
export type GetAppoinmentByIdRequest = string
export type CreateAppoinmentRequest = {
    id: string
}
export type UpdateAppoinmentByIdRequest = {}
export type DeleteAppoinmentsByIdsRequest = {}
    // Responses
export type GetAppoinmentsResponse = {
    appointment_id: string,
    appointment_date: string,
    appointment_address: string,
    contact_email: string,
    contact_name: string,
    contact_surname: string,
    is_cancelled: boolean,
    agents: { agent_id: string, agent_name: string, agent_surname: string } []
}[];

export interface AppoinmentServiceInterface {
    getAppointments(params?: GetAppoinmentsRequest): Promise<false | ApiResponse<GetAppoinmentsResponse>>

    getAppointmentById(id: GetAppoinmentByIdRequest): Promise<false | ApiResponse<any>>

    createAppoinment(body: CreateAppoinmentRequest): Promise<false | ApiResponse<any>>

    upsertAppoinmentById(body: UpdateAppoinmentByIdRequest, id: string): Promise<false | ApiResponse<any>>
}
/* Agent */
export type GetAgentsResponse = {
    id: string,
    createdTime: string,
    number: number,
    agent_name: string,
    agent_surname: string,
    appointments: string[],
    color: string
}[];
export type GetAgentsRequest = {
    maxRecords?: number,
}

export interface AgentServiceInterface {
    getAgents(params: GetAgentsRequest): Promise<false | ApiResponse<GetAgentsResponse>>
}
/* Contact */
export type GetContactsResponse = {
    key: number,
    contact_id: number,
    contact_name: string,
    contact_surname: string,
    contact_email: string,
    contact_phone: string,
    appointments: string[]
}[];
export type GetContactsRequest = {
    maxRecords?: number,
}

export interface ContactServiceInterface {
    getContacts(params: GetContactsRequest): Promise<false | ApiResponse<GetContactsResponse>>
}


