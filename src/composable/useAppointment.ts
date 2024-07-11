import {onMounted, ref} from "vue";

import {
    AgentServiceInterface,
    AppoinmentServiceInterface, ContactServiceInterface,
    GetAgentsResponse,
    GetAppoinmentsResponse, GetContactsResponse
} from "@/services/ports.ts";
import {computed} from "@vue/reactivity";
import {AgentService} from "@/services/AgentService.ts";
import {ContactService} from "@/services/ContactService.ts";
import {AppoinmentService} from "@/services/AppoinmentService.ts";
export default function useAppointment() {
    //states
    const appointments = ref([] as GetAppoinmentsResponse);
    const agents = ref([] as GetAgentsResponse);
    const contacts = ref([] as GetContactsResponse);
    const appointmentService: AppoinmentServiceInterface = AppoinmentService
    const agentService: AgentServiceInterface = AgentService
    const contactService: ContactServiceInterface = ContactService
    const currentPage = ref(1);
    //lifecycles
    onMounted(async () => {
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
    })
    //computeds
    const showingAppointments = computed(() => {
        return appointments.value.slice((currentPage.value - 1) * 10, ((currentPage.value - 1) * 10) + 10)
    });

    const totalPage = computed(() => {
        return Math.ceil(appointments.value.length / 10)
    })

    const totalAppointments = computed(() => {
        return appointments.value.length;
    });
    return {
        appointments: showingAppointments,
        totalAppointments,
        agents,
        contacts,
        currentPage,
        totalPage
    }
}