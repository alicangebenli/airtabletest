import {
    AppoinmentServiceInterface,
    CreateAppoinmentRequest,
    GetAppoinmentByIdRequest,
    GetAppoinmentsRequest,
    UpdateAppoinmentByIdRequest
} from "@/services/ports.ts";
import http from "@/shared/helpers/http.ts";
import Appointment from "@/domain/Appointment.ts";
import Contact from "@/domain/Contact.ts";
import Agent from "@/domain/Agent.ts";

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
        const appointment = new Appointment(
            item?.fields?.appointment_id || "",
            item?.fields?.appointment_date || "",
            item?.fields?.appointment_address || "",
            item?.fields?.is_cancelled,
        )
        const contact = new Contact(
            item?.fields?.contact_id?.[0] || "",
            item?.fields?.contact_name?.[0] || "",
            item?.fields?.contact_surname?.[0] || "",
            item?.fields?.contact_email?.[0] || "",
            item?.fields?.contact_phone?.[0] || "",
        )

        return {
            appointment, contact, agents: item?.fields?.agent_id?.map((id: string, index: number) => {
                return new Agent(
                    id,
                    item.fields.agent_name[index],
                    item.fields.agent_surname[index],
                )
            }) || []
        }
    }
}