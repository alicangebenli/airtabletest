import {
    AppoinmentServiceInterface,
    CreateAppoinmentRequest,
    GetAppoinmentByIdRequest,
    GetAppoinmentsRequest,
    UpdateAppoinmentByIdRequest
} from "@/services/ports.ts";
import http from "@/shared/helpers/http.ts";

export const AppoinmentService: AppoinmentServiceInterface = {
    async getAppointments(params: GetAppoinmentsRequest): Promise<false | ApiResponse<any>> {
        const response = await http.get(`/Appointments`, {
            params,
        })

        if (response.status === 200) {
            return response.data
        }

        return false
    },
    async getAppointmentById(id: GetAppoinmentByIdRequest): Promise<false | ApiResponse<any>> {
        const response = await http.get(`/Appointments?${id}`)

        if (response.status === 200) {
            return response.data
        }

        return false
    },
    async createAppoinment(body: CreateAppoinmentRequest): Promise<false | ApiResponse<any>> {
        const response = await http.post('/Appointments', {
            fields: body
        });

        if (response.status === 200) {
            return response.data;
        }

        return false;
    },
    async upsertAppoinmentById(body: UpdateAppoinmentByIdRequest, id: string): Promise<false | ApiResponse<any>> {
        const response = await http.patch(`/Appointments?${id}`, {
            fields: body
        });

        if (response.status === 200) {
            return response.data;
        }

        return false;
    },
}