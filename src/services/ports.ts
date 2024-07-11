/* Appointment */
// Requests
import Agent from "@/domain/Agent.ts";
import Appointment from "@/domain/Appointment.ts";
import Contact from "@/domain/Contact.ts";

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
export type GetAppoinmentsResponse = { id: number, agents: Agent[], appointment: Appointment, contact: Contact }[];

export interface AppoinmentServiceInterface {
    getAppointments(params?: GetAppoinmentsRequest): Promise<false | ApiResponse<GetAppoinmentsResponse>>

    getAppointmentById(id: GetAppoinmentByIdRequest): Promise<false | ApiResponse<any>>

    createAppoinment(body: CreateAppoinmentRequest): Promise<false | ApiResponse<any>>

    upsertAppoinmentById(body: UpdateAppoinmentByIdRequest, id: string): Promise<false | ApiResponse<any>>
}

/* Agent */
export type GetAgentsResponse = { id: number, agent: Agent, appointments: Pick<Appointment, 'id'>[] }[];
export type GetAgentsRequest = {
    maxRecords?: number,
}

export interface AgentServiceInterface {
    getAgents(params: GetAgentsRequest): Promise<false | ApiResponse<GetAgentsResponse>>
}

/* Contact */
export type GetContactsResponse = { id: number, contact: Contact, appointments: Pick<Appointment, 'id'>[] }[];
export type GetContactsRequest = {
    maxRecords?: number,
}

export interface ContactServiceInterface {
    getContacts(params: GetContactsRequest): Promise<false | ApiResponse<GetContactsResponse>>
}


