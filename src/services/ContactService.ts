import {ContactServiceInterface, GetContactsRequest} from "@/services/ports.ts";
import http from "@/shared/helpers/http.ts";
import Contact from "@/domain/Contact.ts";

export const ContactService: ContactServiceInterface = {
    async getContacts(params: GetContactsRequest): Promise<any> {
        const response = await http.get(`/Contacts`, {
            params
        });

        if (response.status === 200) {
            return response.data?.records.map(normalizer.getContactsNormalizer)
        }

        return false
    }
}

const normalizer = {
    getContactsNormalizer(item: any, id: number) {
        const contact = new Contact(
            item?.fields?.contact_id || "",
            item?.fields?.contact_name || "",
            item?.fields?.contact_surname || "",
            item?.fields?.contact_email || "",
            item?.fields?.contact_phone || ""
        )

        return {
            id,
            contact,
            appointments: item?.fields?.appointments || []
        }
    }
}