import {ref} from "vue";
import {GetAgentsResponse, GetAppoinmentsResponse, GetContactsResponse} from "@/services/ports.ts";

export const appointments = ref([] as GetAppoinmentsResponse);
export const agents = ref([] as GetAgentsResponse);
export const contacts = ref([] as GetContactsResponse);
export const currentPage = ref(1);
export const filters = ref({
    agents: [],
    status: "",
    fromDate: 0,
    endDate: 0,
    searchText: ""
})

export const modalVisible = ref(false);
export const showedAppointment = ref();

export const isReady = ref(false);