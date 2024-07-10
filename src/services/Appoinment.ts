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
            return response.data?.records.map(normalizer.getApointmentNormalizer)
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


const normalizer = {
    getApointmentNormalizer(item: any) {
        return {
            key: item?.fields?.appointment_id || "",
            appointment_id: item?.fields?.appointment_id || "",
            appointment_date: item?.fields?.appointment_date || "",
            appointment_address: item?.fields?.appointment_address || "",
            contact_email: item?.fields?.contact_email?.[0] || "",
            contact_name: item?.fields?.contact_name?.[0] || "",
            contact_surname: item?.fields?.contact_surname?.[0] || "",
            contact_phone: item?.fields?.contact_phone?.[0] || "",
            is_cancelled: item?.fields?.is_cancelled || false,
            agents: item?.fields?.agent_id?.map((id: string, index: number) => {
                return {
                    id,
                    name: item.fields.agent_name[index]
                }
            }) || []
        }
    }
}