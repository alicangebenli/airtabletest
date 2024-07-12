import {
    AgentServiceInterface,
    AppoinmentServiceInterface, ContactServiceInterface, CreateAppoinmentRequest, UpsertAppoinmentByIdRequest,
} from "@/services/ports.ts";
import {computed} from "@vue/reactivity";
import {AgentService} from "@/services/AgentService.ts";
import {ContactService} from "@/services/ContactService.ts";
import {AppoinmentService} from "@/services/AppoinmentService.ts";
import {agents, appointments, contacts, currentPage, filters} from "@/stores/appointment.ts";

export default function useAppointment() {
    const appointmentService: AppoinmentServiceInterface = AppoinmentService
    const agentService: AgentServiceInterface = AgentService
    const contactService: ContactServiceInterface = ContactService

    const showingAppointments = computed(() => {
        let currentAppointments = appointments.value;
        const {searchText, status, fromDate, endDate} = filters.value;
        if (searchText) {
            currentAppointments = currentAppointments.filter(item =>
                item.contact?.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
                item.contact?.phone.toString()?.includes(searchText) ||
                item.contact.email?.toLowerCase().includes(searchText.toLowerCase())
            )
        }

        if (status) {
            if (status === 'completed') {
                currentAppointments = currentAppointments.filter(x => x.appointment.isCompleted);
            } else if (status === 'upcoming') {
                currentAppointments = currentAppointments.filter(x => x.appointment.isUpcoming);
            } else if (status === 'cancelled') {
                currentAppointments = currentAppointments.filter(x => x.appointment.isCancelled);
            }
        }

        if (fromDate && endDate) {
            currentAppointments = currentAppointments.filter(x =>
                x.appointment.getTime >= fromDate
                && x.appointment.getTime <= endDate
            );
        }

        return currentAppointments.slice((currentPage.value - 1) * 10, ((currentPage.value - 1) * 10) + 10)
    });

    const totalPage = computed(() => {
        return Math.ceil(appointments.value.length / 10)
    })

    const totalAppointments = computed(() => {
        return appointments.value.length;
    });

    // actions
    const updateData = async () => {
        const [appointmentResponse, agentResponse, contactResponse] = await Promise.all(
            [
                await appointmentService.getAppointments({maxRecords: 1000}),
                await agentService.getAgents({maxRecords: 1000}),
                await contactService.getContacts({maxRecords: 1000}),
            ]
        )

        if (appointmentResponse) {
            appointments.value = appointmentResponse
        }

        if (agentResponse) {
            agents.value = agentResponse;
        }

        if (contactResponse) {
            contacts.value = contactResponse;
        }
    }

    const create = async (data: CreateAppoinmentRequest) => {
        return appointmentService.createAppoinment(data)
    }

    const update = async (data: UpsertAppoinmentByIdRequest, id: string) => {
        return appointmentService.upsertAppoinmentById(data, id)
    }
    return {
        appointments: showingAppointments,
        totalAppointments,
        totalPage,
        updateData,
        create,
        update
    }
}