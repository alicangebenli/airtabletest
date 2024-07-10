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
