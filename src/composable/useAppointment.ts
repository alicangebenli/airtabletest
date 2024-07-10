import {onMounted, ref} from "vue";
import {AppoinmentService} from "@/services/Appoinment.ts";
import {AppoinmentServiceInterface, GetAppoinmentsResponse} from "@/services/ports.ts";

export default function useAppointment() {
    const appointments = ref([] as GetAppoinmentsResponse);
    const appointmentService: AppoinmentServiceInterface = AppoinmentService
    // const currentPage = ref(1);

    onMounted(async () => {
        const response = await appointmentService.getAppointments({maxRecords: 1000});

        if (response) {
            appointments.value = response
        }
    })


    return {
        appointments: appointments
    }
}