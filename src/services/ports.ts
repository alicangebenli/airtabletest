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

export interface AppoinmentServiceInterface {
    getAppointments(params: GetAppoinmentsRequest): Promise<false | ApiResponse<any>>

    getAppointmentById(id: GetAppoinmentByIdRequest): Promise<false | ApiResponse<any>>

    createAppoinment(body: CreateAppoinmentRequest): Promise<false | ApiResponse<any>>

    upsertAppoinmentById(body: UpdateAppoinmentByIdRequest, id: string): Promise<false | ApiResponse<any>>
}
